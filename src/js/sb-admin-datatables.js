// Call the dataTables jQuery plugin
$(document).ready(function() {
  setTimeout(function(){ 
    $('#dataTable3').DataTable();
   }, 10000);
});
$("#sidenavToggler").click(function(e) {
  console.log('entrei');
  e.preventDefault();
  $("body").toggleClass("sidenav-toggled");
  $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
  $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
});