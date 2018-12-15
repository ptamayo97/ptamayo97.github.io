$(document).ready(function() {
  $(".sidenav").sidenav({
    edge: "right"
  });

  $("#greetingContent").hover(
    function() {
      $("#eyes").text(";)");
    },
    function() {
      $("#eyes").text(":)");
    }
  );
});
