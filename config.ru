require 'rubygems'
require 'middleman'
require "rack/contrib/try_static"
require "rack/contrib/simple_endpoint"

use Rack::TryStatic, :root => "build", :urls => %w[/], :try => ['.html']

class SinatraStaticServer < Sinatra::Base

  get('/ui/?') do
    redirect '/'
  end

  not_found do
    send_sinatra_file('404.html') {"Sorry, I cannot find #{request.path}"}
  end

end

use SinatraStaticServer

run Middleman.server
