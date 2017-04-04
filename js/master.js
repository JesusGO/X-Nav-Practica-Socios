var timeline="json/timeline.json";
var myline="json/myline.json";
var update="json/update.json";

function loadMyPanels(data){
	for (var i = 0; i < data.length; i++) {
		var content='<div class="col-xs-12 col-sm-12 col-md-12 bo ">\
		<button type="button" class="btn-modal" \
		data-titulo="'+data[i].titulo+'" \
		data-contenido="'+data[i].contenido+'" \
		data-avatar="'+data[i].avatar+'" \
		data-fecha="'+data[i].fecha+'" \
		data-autor="'+data[i].autor+'" \
		data-toggle="modal" data-target="#myModal">\
			<div class="panel panel-default">\
				<div class="panel-body">\
					<div class="media">\
						<div class="media-body">\
							<p class="media-heading text-left">'+data[i].titulo+'</p>\
						</div>\
					</div>\
					<div class="panel-footer">\
						<ul class="list-inline">\
							<li><h6><i class="fa fa-calendar-o" aria-hidden="true"></i> '+data[i].fecha+'</h6></li>\
							<li><h6><i class="fa fa-user-o" aria-hidden="true"></i> '+data[i].autor+'</h6></li>\
						</ul>\
					</div>\
				</div>\
			</div>\
		</button>\
		</div>';
		$("#home-panel").prepend(content);
	}
}
function createPanels(container,data){

	for (var i = 0; i < data.length; i++) {
		console.log(data[i].titulo);
		var content='<div class="box-btn-panel col-md-12 bo">\
			<button type="button" class="btn-modal" \
			data-titulo="'+data[i].titulo+'" \
			data-contenido="'+data[i].contenido+'" \
			data-avatar="'+data[i].avatar+'" \
			data-fecha="'+data[i].fecha+'" \
			data-autor="'+data[i].autor+'" \
			data-toggle="modal" data-target="#myModal">\
				<div class="panel panel-default">\
					<div class="panel-body">\
						<div class="media">\
							<div class="media-left">\
								<a href="#">\
									<img class="media-object img-circle" src="'+data[i].avatar+'" alt="...">\
								</a>\
							</div>\
							<div class="media-body">\
								<h4 class="media-heading text-left">'+data[i].titulo+'</h4>\
							</div>\
						</div>\
						<div class="panel-footer">\
							<ul class="list-inline">\
		  					<li><h6><i class="fa fa-calendar-o" aria-hidden="true"></i> '+data[i].fecha+'</h6></li>\
								<li><h6><i class="fa fa-user-o" aria-hidden="true"></i> '+data[i].autor+'</h6></li>\
							</ul>\
						</div>\
					</div>\
				</div>\
			</button>\
		</div>';
		container.prepend(content);
	}

}

$(document).ready(function() {
	$(document).on("click", ".btn-modal", function () {
		var avatar = $(this).data('avatar');
		var titulo = $(this).data('titulo');
		var contenido = $(this).data('contenido');
		var fecha = $(this).data('fecha');
		var autor = $(this).data('autor');

		$("#myModalImg").attr('src',avatar);
		$("#myModalTitle").text(titulo);
		$("#myModalContenido").text(contenido);
		$("#myModalFecha span").text(fecha);
		$("#myModalAutor span").text(autor);

	});

	$.ajax({
		url: timeline
		}).done(function( data ) {
			var main=$("#main-panel");
			createPanels(main,data);
	});

	$.ajax({
		url: myline
		}).done(function( data ) {
			$("#my-avatar").attr('src',data[0].avatar);
			$("#username span").text(data[0].autor);
			$("#panels-number span").text(data.length);
			loadMyPanels(data);
	});

	$.ajax({
		url: update
		}).done(function( data ) {
			$("#bagde-id").text(data.length);
	});
});

$("#upload").click(function() {
	$.ajax({
		url: "json/update.json"
		}).done(function( data ) {
			var home=$("#main-panel");
			createPanels(home,data);
			$("#bagde-id").text("");
			$("#upload").prop('disabled', true);
			$('.navbar-nav li a[href="#main"]').tab('show');
	});
});
