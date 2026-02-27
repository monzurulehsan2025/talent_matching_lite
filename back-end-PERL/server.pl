#!/usr/bin/perl
use strict;
use warnings;
use IO::Socket;
use JSON;
use FindBin;

# Port to listen on
my $port = 3001;

# Data file
my $json_file = "$FindBin::Bin/people.json";

# Ensure data file exists
unless (-e $json_file) {
    open my $fh, '>', $json_file or die "Cannot create $json_file: $!";
    print $fh '[]';
    close $fh;
}

sub read_db {
    open my $fh, '<', $json_file or return [];
    local $/;
    my $content = <$fh>;
    close $fh;
    return decode_json($content || '[]');
}

sub write_db {
    my $data = shift;
    open my $fh, '>', $json_file or die "Cannot write $json_file: $!";
    print $fh encode_json($data);
    close $fh;
}

my $socket = new IO::Socket::INET (
    LocalHost => '0.0.0.0',
    LocalPort => $port,
    Proto => 'tcp',
    Listen => 5,
    Reuse => 1
);
die "Could not create socket: $!" unless $socket;

print "Talent Ops Perl Backend running on http://localhost:$port\n";

while (1) {
    my $client = $socket->accept();
    next unless $client;

    my $header_data = "";
    while (my $line = <$client>) {
        $header_data .= $line;
        last if $line =~ /^\r?\n$/;
    }

    my ($method, $url) = $header_data =~ /^(\w+)\s+([^\s]+)/;
    print "Request: $method $url\n";

    # Parse headers for Content-Length
    my $content_length = 0;
    if ($header_data =~ /Content-Length: (\d+)/i) {
        $content_length = $1;
    }

    # Read body if any
    my $body = "";
    if ($content_length > 0) {
        read($client, $body, $content_length);
    }

    # CORS Headers
    my $cors = "Access-Control-Allow-Origin: *\r\n" .
               "Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\r\n" .
               "Access-Control-Allow-Headers: Content-Type\r\n";

    if ($method eq 'OPTIONS') {
        print $client "HTTP/1.1 204 No Content\r\n$cors\r\n";
        close $client;
        next;
    }

    my $response_json = "";
    my @people = @{read_db()};

    if ($url =~ /^\/api\/people/) {
        if ($method eq 'GET') {
            $response_json = encode_json(\@people);
        }
        elsif ($method eq 'POST') {
            my $new_guy = decode_json($body);
            push @people, $new_guy;
            write_db(\@people);
            $response_json = encode_json($new_guy);
        }
        elsif ($method eq 'PUT') {
            my $updated = decode_json($body);
            for (my $i = 0; $i < @people; $i++) {
                if ($people[$i]->{id} eq $updated->{id}) {
                    $people[$i] = $updated;
                    last;
                }
            }
            write_db(\@people);
            $response_json = encode_json($updated);
        }
        elsif ($method eq 'DELETE') {
            # Check for ID in URL suffix ?id=X or /X
            my $id_to_delete = "";
            if ($url =~ /[?&]id=([^&]+)/) {
                $id_to_delete = $1;
            }
            if ($id_to_delete) {
                my @new_list = grep { $_->{id} ne $id_to_delete } @people;
                write_db(\@new_list);
                $response_json = '{"success":true}';
            } else {
                $response_json = '{"error":"ID required"}';
            }
        }
    } else {
        $response_json = '{"error":"Not found"}';
    }

    my $resp_len = length($response_json);
    print $client "HTTP/1.1 200 OK\r\n" .
                  "Content-Type: application/json\r\n" .
                  "Content-Length: $resp_len\r\n" .
                  "$cors" .
                  "Connection: close\r\n\r\n";
    print $client $response_json;
    close $client;
}
