"use strict";var convertToInlineSvg=function(a){$("img.svg").each(function(){var e=jQuery(this),o=e.attr("id"),n=e.attr("class"),i=e.attr("src");$.get(i,function(i){var d=jQuery(i).find("svg");"undefined"!=typeof o&&(d=d.attr("id",o)),"undefined"!=typeof n&&(d=d.attr("class",n+" replaced-svg")),d=d.removeAttr("xmlns:a"),e.replaceWith(d),a&&a.runMe()},"xml")})},audioJson=function(){var a=null;return $.ajax({async:!1,global:!1,url:"static/audioDetails.json",dataType:"json",success:function(e){a=e}}),a}(),audioWrapper=$(".audioSection");audioJson.forEach(function(a,e){var o='<img src="./assets/images/audio-icons/'+a.image+'.svg" class="svg audioImage audioImage'+e+'" />',n='<div id="slider'+e+'" class="slider"></div>',i='<div class="audioName audioName'+e+'">'+a.name+"</div>",d='<audio id="audio'+e+'" class="audio audio'+e+' hidden" loop><source src="./assets/audio/'+a.audio+'.mp3" type="audio/mpeg"></audio>',t='<div class="audioItem audioItem'+e+'" onClick="playAudio('+e+')">'+o+d+i+n+"</div>";audioWrapper.append(t)});var playAudio=function(a){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50,o=($.grep(audioJson,function(e){return e.id===a}),$(".audio"+a)[0]),n=$("#slider"+a)[0];if(o.paused)o.play(),$(".audioItem"+a).addClass("active"),noUiSlider.create(n,{start:e,connect:[!0,!1],range:{min:0,max:100}}),n.noUiSlider.on("update",function(a,e){o.volume=Math.round(a[e])/100}),$(".randomPlay.play").hide(),$(".randomPlay.pause").show();else{o.pause(),$(".audioItem"+a).removeClass("active"),n.noUiSlider.destroy();for(var i=0,d=0;d<audioJson.length;d++)$(".audio"+d)[0].paused&&i++;i===audioJson.length&&($(".randomPlay.play").show(),$(".randomPlay.pause").hide())}},pauseAll=function(){for(var a=!1,e=[],o=0;o<audioJson.length;o++){var n=0;$(".audio"+o)[0].paused||(playAudio(o),n=document.getElementById("audio"+o).volume,a=!0),e.push(n)}return sessionStorage.setItem("audioVolumeArray",e),$(".randomPlay.play").show(),$(".randomPlay.pause").hide(),a},shuffle=function(){pauseAll();for(var a=0;a<4;a++)playAudio(Math.floor(Math.random()*audioJson.length))},globalPlay=function(){var a={0:[.12,0,0,.3,0,.3,0,0,.3,0,.78,.5],1:[.9,0,0,0,.7,0,.8,0,.3,.2,0,0],2:[.32,0,.3,0,0,0,0,.7,.3,.2,.2,.9],3:[.7,0,.4,.1,.6,0,0,0,.33,.72,0,0]},e=localStorage.getItem("audioVolumeArray"),o=[];o=e?e.split(","):a[Math.floor(4*Math.random())];for(var n=0;n<o.length;n++)0!=parseFloat(o[n])&&playAudio(n,100*parseFloat(o[n]))},save=function(){for(var a=[],e=0;e<audioJson.length;e++){var o=0;$(".audio"+e)[0].paused||(o=document.getElementById("audio"+e).volume),a.push(o)}localStorage.setItem("audioVolumeArray",a)};$(function(){$(".randomPlay.pause").hide(),convertToInlineSvg(),$(".menu-bar").on("click",function(){$(".menu").hasClass("menu-hidden")?($(".menu").removeClass("menu-hidden"),$(".container").addClass("menu-active")):($(".menu").addClass("menu-hidden"),$(".container").removeClass("menu-active"))}),$(".overlay").on("click",function(){$(".menu").addClass("menu-hidden"),$(".container").removeClass("menu-active")}),$(".about-option").on("click",function(a){$(".menu").addClass("menu-hidden"),$(".container").removeClass("menu-active"),setTimeout(function(){$(".about-modal").addClass("active")},200)}),$(".feedback-option").on("click",function(a){$(".menu").addClass("menu-hidden"),$(".container").removeClass("menu-active"),setTimeout(function(){$(".feedback-modal").addClass("active")},200)}),$(".modal-close").on("click",function(){$(".modal").addClass("animate-close"),setTimeout(function(){$(".modal").removeClass("animate-close"),$(".modal").removeClass("active")},300),$(".feedback-textarea")[0].value="",$(".placeholder-text").removeClass("hidden")}),$(".feedback-textarea").on("focus",function(){$(".placeholder-text").addClass("hidden")}),$(".feedback-textarea").on("blur",function(){""===$(".feedback-textarea")[0].value&&$(".placeholder-text").removeClass("hidden")}),$(".feedback-button").on("click",function(){var a=$(".feedback-textarea")[0].value,e="App feedback";console.log(e+"\n"+a),window.open("mailto:vatsalya25@gmail.com?subject="+e+"&body="+a)})});