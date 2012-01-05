#= require "vendor/jquery"
#= require "vendor/bootstrap-twipsy"
#= require "vendor/animated-progress"
#= require_self

window.App = {
  sections: ['intro', 'compatibility', 'wild']
  
  progressBar: null
  
  init: ->
    self = @
    $('a[rel="twipsy"], abbr').twipsy()
    
    @progressBar = $("#progress_bar")
    @progressBar.removeClass("transition").addClass("error").addClass("transition")
    $(".ui-progress .ui-label", @progressBar).hide()
    $(".ui-progress", @progressBar).css "width", "7%"
    $(".ui-progress", @progressBar).animateProgress 35, ->
      self.fadeInNextSection()
      setTimeout (->
        $("#progress_bar").removeClass("error").addClass "warning"
        $("#progress_bar .ui-progress").animateProgress 60, ->
          self.fadeInNextSection()
          $("#progress_bar").removeClass "warning"
          setTimeout (->
            $("#progress_bar .ui-progress").animateProgress 100, ->
              self.fadeInNextSection()
              $('footer').fadeIn(1000)
          ), 2000
      ), 1000
    
  fadeIn: (section) ->
    $("section.#{section}").fadeIn 'slow'

  fadeInNextSection: ->
    @fadeIn(@sections.shift()) if @sections.length > 0
} 


