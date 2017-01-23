"use strict";var convertToInlineSvg=function(e){$("img.svg").each(function(){var a=jQuery(this),o=a.attr("id"),n=a.attr("class"),t=a.attr("src");$.get(t,function(t){var i=jQuery(t).find("svg");"undefined"!=typeof o&&(i=i.attr("id",o)),"undefined"!=typeof n&&(i=i.attr("class",n+" replaced-svg")),i=i.removeAttr("xmlns:a"),a.replaceWith(i),e&&e.runMe()},"xml")})},audioJson=function(){var e=null;return $.ajax({async:!1,global:!1,url:"static/audioDetails.json",dataType:"json",success:function(a){e=a}}),e}(),audioWrapper=$(".audioSection");audioJson.forEach(function(e,a){var o='<img src="./assets/images/audio-icons/'+e.image+'.svg" class="svg audioImage audioImage'+a+'" />',n='<div id="slider'+a+'" class="slider"></div>',t='<div class="audioName audioName'+a+'">'+e.name+"</div>",i='<audio id="audio'+a+'" class="audio audio'+a+' hidden" loop><source src="./assets/audio/'+e.audio+'.mp3" type="audio/mpeg"></audio>',s='<div class="audioItem audioItem'+a+'" onClick="playAudio('+a+')">'+o+i+t+n+"</div>";audioWrapper.append(s)});var playAudio=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50,o=($.grep(audioJson,function(a){return a.id===e}),$(".audio"+e)[0]),n=$("#slider"+e)[0];if(o.paused)o.play(),$(".audioItem"+e).addClass("active"),noUiSlider.create(n,{start:a,connect:[!0,!1],range:{min:0,max:100}}),n.noUiSlider.on("update",function(e,a){o.volume=Math.round(e[a])/100}),$(".randomPlay.play").addClass("hidden"),$(".randomPlay.pause").removeClass("hidden"),$(".randomPlay.save").removeClass("disabled");else{o.pause(),$(".audioItem"+e).removeClass("active"),n.noUiSlider.destroy();for(var t=0,i=0;i<audioJson.length;i++)$(".audio"+i)[0].paused&&t++;t===audioJson.length&&($(".randomPlay.play").removeClass("hidden"),$(".randomPlay.pause").addClass("hidden"),$(".randomPlay.save").addClass("disabled"))}},pauseAll=function(){for(var e=!1,a=[],o=0;o<audioJson.length;o++){var n=0;$(".audio"+o)[0].paused||(playAudio(o),n=document.getElementById("audio"+o).volume,e=!0),a.push(n)}return $(".randomPlay.play").removeClass("hidden"),$(".randomPlay.pause").addClass("hidden"),$(".randomPlay.save").addClass("disabled"),e},shuffle=function(){pauseAll();for(var e=0;e<4;e++)playAudio(Math.floor(Math.random()*audioJson.length))},globalPlay=function(){var e={0:[.12,0,0,.3,0,.3,0,0,.3,0,.78,.5],1:[.9,0,0,0,.7,0,.8,0,.3,.2,0,0],2:[.32,0,.3,0,0,0,0,.7,.3,.2,.2,.9],3:[.7,0,.4,.1,.6,0,0,0,.33,.72,0,0]},a=localStorage.getItem("audioVolumeArray"),o=[];o=a?a.split(","):e[Math.floor(4*Math.random())],playCombination(o)},saveLastPlayed=function(){for(var e=[],a=0;a<audioJson.length;a++){var o=0;$(".audio"+a)[0].paused||(o=document.getElementById("audio"+a).volume),e.push(o)}localStorage.setItem("audioVolumeArray",e)},closeModal=function(){$(".modal").addClass("animate-close"),setTimeout(function(){$(".modal").removeClass("animate-close"),$(".modal").removeClass("active")},300),$(".feedback-textarea")[0].value="",$(".placeholder-text").removeClass("hidden")},saveCombination=function(){var e=$("#combo-input").val(),a=localStorage.getItem("savedCombination");if(""===e)return"Name cannot be empty. Please enter a valid name.";if(a){var o=Object.keys(jQuery.parseJSON(a));if(o.length>9)return"Memory Full! First delete an existing combination.";if(o.indexOf(e)>-1)return"Combination with the same name already exists."}for(var n=[],t=0;t<audioJson.length;t++){var i=0;$(".audio"+t)[0].paused||(i=document.getElementById("audio"+t).volume),n.push(i)}var s=jQuery.parseJSON(a)||{};return s[e||"Combo "]=n,localStorage.setItem("savedCombination",JSON.stringify(s)),"success"},deleteCombination=function(e){var a=localStorage.getItem("savedCombination");if(a){var o=jQuery.parseJSON(a);o[e]&&(delete o[e],localStorage.setItem("savedCombination",JSON.stringify(o)))}getCombinationsNameList()},playSavedCombination=function(e){var a=localStorage.getItem("savedCombination");if(a){var o=jQuery.parseJSON(a);if(o[e])return void playCombination(o[e])}alert("Sorry ! There was some error in data. Can't play this combination")},playCombination=function(e){for(var a=0;a<e.length;a++)0!=parseFloat(e[a])&&playAudio(a,100*parseFloat(e[a]))},getCombinationsNameList=function(){var e=localStorage.getItem("savedCombination");return e?void!function(){var a=Object.keys(jQuery.parseJSON(e)),o=$(".alt-menu");$(".alt-menu .combo-option").remove(),a.forEach(function(e){var a='<div class="menu-option combo-option" onClick="toggleComboPlay(this)" ><div class="option"><img src="./assets/images/music-icon.svg" class="svg option-icon info-icon" /></div><div class="text">'+e+'</div><div class="option delete-sound" onClick="deleteCombination(\''+e+'\')"><img src="./assets/images/delete-button.svg" class="svg option-icon delete-icon" /></div></div>';o.append(a)}),convertToInlineSvg()}():null};$.fn.setCursorToTextEnd=function(){var e=this.val();this.val(e)};var toggleComboPlay=function(e){var a=$(e).children(".text")[0].innerText;$(e).hasClass("saved-active")?($(e).removeClass("saved-active"),pauseAll()):($(".combo-option").removeClass("saved-active"),$(e).addClass("saved-active"),playSavedCombination(a))};$(function(){convertToInlineSvg(),getCombinationsNameList(),$(".menu-bar").on("click",function(){$(".menu").hasClass("menu-hidden")?($(".menu").removeClass("menu-hidden"),$(".container").addClass("menu-active"),$("body").addClass("hideOverflow")):($(".menu").addClass("menu-hidden"),$(".container").removeClass("menu-active"),$("body").removeClass("hideOverflow"))}),$(".alt-menu-bar").on("click",function(){getCombinationsNameList(),$(".alt-menu").hasClass("alt-menu-hidden")?($(".alt-menu").removeClass("alt-menu-hidden"),$(".container").addClass("alt-menu-active"),$("body").addClass("hideOverflow")):($(".alt-menu").addClass("alt-menu-hidden"),$(".container").removeClass("alt-menu-active"),$("body").removeClass("hideOverflow"))}),$(".overlay").on("click",function(){$(".menu").addClass("menu-hidden"),$(".alt-menu").addClass("alt-menu-hidden"),$(".container").removeClass("menu-active"),$(".container").removeClass("alt-menu-active")}),$(".about-option").on("click",function(e){$(".menu").addClass("menu-hidden"),$(".container").removeClass("menu-active"),setTimeout(function(){$(".about-modal").addClass("active")},200)}),$(".feedback-option").on("click",function(e){$(".menu").addClass("menu-hidden"),$(".container").removeClass("menu-active"),setTimeout(function(){$(".feedback-modal").addClass("active")},200)}),$(".modal-close").on("click",function(){closeModal()}),$(".feedback-textarea").on("focus",function(){$(".placeholder-text").addClass("hidden")}),$(".feedback-textarea").on("blur",function(){""===$(".feedback-textarea")[0].value&&$(".placeholder-text").removeClass("hidden")}),$(".feedback-button").on("click",function(){var e=$(".feedback-textarea")[0].value,a="App feedback";window.open("mailto:vatsalya25@gmail.com?subject="+a+"&body="+e)}),$(".randomPlay.save").on("click",function(){$(".saveName-modal").addClass("active"),$(".combo-error").text(""),setTimeout(function(){$("#combo-input").focus(),$("#combo-input").setCursorToTextEnd()},10)}),$(".save-button").on("click",function(){var e=saveCombination();"success"!==e?($(".combo-error").text(e),$("#combo-input").focus()):closeModal()}),$("#combo-input").on("change paste keyup",function(){$(".combo-error").text("")}),$(".delete-sound").on("click",function(){$(".alt-menu").addClass("alt-menu-hidden"),$(".container").removeClass("alt-menu-active"),setTimeout(function(){$(".deleteSaved-modal").addClass("active")},200)}),$(".confirm-delete.no-button").on("click",function(){closeModal()}),$(".confirm-delete.yes-button").on("click",function(){closeModal()})});