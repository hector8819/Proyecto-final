
$(document).ready(function() {
    function changeColor() {
        if ($('h1').hasClass('main-titulo')) {
            $('h1').removeClass('main-titulo');
            $('h1').addClass('second-titulo');
        }
        else {
            $('h1').removeClass('second-titulo');
            $('h1').addClass('main-titulo');
        }
    }
    setInterval(changeColor, 900);
});

//VARIABLES
var bHorizontal=0;
var bVertical=0;
var buscarDulces=0;
var lencolum=["","","","","","",""];
var lenrest=["","","","","","",""];
var maximo=0;
var matriz=0;
var intervalo=0;
var eliminar=0;
var nuevosDulces=0;
var tiempo=0;
var i=0;
var contadorTotal=0;
var espera=0;
var score=0;
var movimientos=0;
var minutos=2;
var segundos=0;

$(".btn-reinicio").click(function(){
	i=0;
	score=0;
	movimientos=0;
	$(".panel-score").css("width","25%");
	$(".panel-tablero").show();
	$(".time").show();
	$("#score-text").html("0");
	$("#movimientos-text").html("0");
	$(this).html("Reiniciar")
	clearInterval(intervalo);
	clearInterval(eliminar);
	clearInterval(nuevosDulces);
	clearInterval(tiempo);
	minutos=2;
	segundos=0;
	borrartotal();
	intervalo=setInterval(function(){
		desplazamiento()
	},500);
	tiempo=setInterval(function(){
		timer()
	},1000);
});

//Comenzar el Juego

function desplazamiento(){
	i=i+1
	var numero=0;
	var imagen=0;
	$(".elemento").draggable({disabled:true});
	if(i<8){
		for(var g=1;g<8;g++){
			if($(".col-"+g).children("img:nth-child("+i+")").html()==null){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+g).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
			}}}
	if(i==8){
	clearInterval(intervalo);
	eliminar=setInterval(function(){
		eliminarhorver()
	},150);}
};

// TIMER

function timer(){
	if(segundos!=0){
		segundos=segundos-1;}
	if(segundos==0){
		if(minutos==0){
			clearInterval(eliminar);
			clearInterval(nuevosDulces);
			clearInterval(intervalo);
			clearInterval(tiempo);
			$(".panel-tablero").hide("drop","slow",funcioncita);
			$(".time").hide();}
		segundos=59;
		minutos=minutos-1;}
	$("#timer").html("0"+minutos+":"+segundos);
};

//Movimientos y puntos de toda la pantalla

function funcioncita(){
	$( ".panel-score" ).animate({width:'100%'},3000);
};

//Borrar todo

function borrartotal(){
	for(var g=1;g<8;g++){
		$(".col-"+g).children("img").detach();}
};

//Eliminar los Dulces

function eliminarhorver(){
	matriz=0;
	bHorizontal=horizontal();
	bVertical=vertical();
	for(var g=1;g<8;g++){
		matriz=matriz+$(".col-"+g).children().length;}

	//Condicional si no encuentra 3 dulces o más

	if(bHorizontal==0 && bVertical==0 && matriz!=49){
		clearInterval(eliminar);
		buscarDulces=0;
		nuevosDulces=setInterval(function(){
			nuevosdulces()
		},500);}

	if(bHorizontal==1||bVertical==1){
		$(".elemento").draggable({disabled:true});
		$("div[class^='col']").css("justify-content","flex-end");
		$(".activo").hide("pulsate",1000,function(){
			var scoretmp=$(".activo").length;
			$(".activo").remove("img");
			score=score+scoretmp*10;
			$("#score-text").html(score);
		});
	}
	if(bHorizontal==0 && bVertical==0 && matriz==49){
		$(".elemento").draggable({
			disabled:false,
			containment:".panel-tablero",
			revert:true,
			revertDuration:0,
			snap:".elemento",
			snapMode:"inner",
			snapTolerance:40,
			start:function(event,ui){
				movimientos=movimientos+1;
				$("#movimientos-text").html(movimientos);}
		});
	}
	$(".elemento").droppable({
		drop:function (event,ui){
			var dropped=ui.draggable;
			var droppedOn=this;
			espera=0;
			do{
				espera=dropped.swap($(droppedOn));}
			while(espera==0);
			bHorizontal=horizontal();
			bVertical=vertical();
			if(bHorizontal==0 && bVertical==0){
				dropped.swap($(droppedOn));}
			if(bHorizontal==1 || bVertical==1){
				clearInterval(nuevosDulces);
				clearInterval(eliminar);
				eliminar=setInterval(function(){
					eliminarhorver()
				},150);}},
	});
};

// Función para intercambiar dulces

jQuery.fn.swap=function(b){
	b=jQuery(b)[0];
	var a=this[0];
	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a,b);
	t.parentNode.insertBefore(b,t);
	t.parentNode.removeChild(t);
	return this;
};

// Función para crear nuevos dulces

function nuevosdulces(){
	$(".elemento").draggable({disabled:true});
	$("div[class^='col']").css("justify-content","flex-start")
	for(var g=1;g<8;g++){
		lencolum[g-1]=$(".col-"+g).children().length;}
	if(buscarDulces==0){
		for(var g=0;g<7;g++){
			lenrest[g]=(7-lencolum[g]);}
		maximo=Math.max.apply(null,lenrest);
		contadorTotal=maximo;}
	if(maximo!=0){
		if(buscarDulces==1){
			for(var g=1;g<8;g++){
				if(contadorTotal>(maximo-lenrest[g-1])){
					$(".col-"+g).children("img:nth-child("+(lenrest[g-1])+")").remove("img");}}
		}
		if(buscarDulces==0){
			buscarDulces=1;
			for(var k=1;k<8;k++){
				for(var g=0;g<(lenrest[k-1]-1);g++){
					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");}}
		}
		for(var g=1;g<8;g++){
			if(contadorTotal>(maximo-lenrest[g-1])){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+g).prepend("<img src="+imagen+" class='elemento'/>");}
		}
	}
	if(contadorTotal==1){
		clearInterval(nuevosDulces);
		eliminar=setInterval(function(){
			eliminarhorver()
		},150);
	}
	contadorTotal=contadorTotal-1;
};

//Busqueda horizontal de dulces

function horizontal(){
	var busHori=0;
	for(var g=1;g<8;g++){
		for(var k=1;k<6;k++){
			var res1=$(".col-"+k).children("img:nth-last-child("+g+")").attr("src");
			var res2=$(".col-"+(k+1)).children("img:nth-last-child("+g+")").attr("src");
			var res3=$(".col-"+(k+2)).children("img:nth-last-child("+g+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-last-child("+(g)+")").attr("class","elemento activo");
				$(".col-"+(k+1)).children("img:nth-last-child("+(g)+")").attr("class","elemento activo");
				$(".col-"+(k+2)).children("img:nth-last-child("+(g)+")").attr("class","elemento activo");
				busHori=1;
			}
		}
	}
	return busHori;
};

//Busqueda vertical de dulces

function vertical(){
	var busVerti=0;
	for(var l=1;l<6;l++){
		for(var k=1;k<8;k++){
			var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src");
			var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src");
			var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo");
				busVerti=1;
			}
		}
	}
	return busVerti;
};
