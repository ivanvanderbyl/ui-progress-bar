compass_config do |config|
  config.line_comments = false
  config.output_style = :expanded
end

set :haml, { :format => :html5, :attr_wrapper => '"'  }

activate :automatic_image_sizes

activate :relative_assets

configure :build do
  activate :cache_buster
end
