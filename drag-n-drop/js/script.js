var Echidna = (function(jq,self){

		self.halfContentSlide  = function(obj){
			if(!jq || typeof obj !== "object") return;
			var opt = jq.extend({
				triggerBtn : "",
				gridContainer : "",
				filterContainer : "",
				callback : "",
				item : ""
			},obj);
			var trigger = jq(opt.triggerBtn), container = jq(opt.gridContainer),filContainer = jq(opt.filterContainer), item = jq(opt.item);
			if(!trigger.length || !container.length || !filContainer.length) return;

			var init = function(){
				// var it_height = item.height(), it_width = item.width(),x=0,y=0;
				// item.each(function(ind,item){
				// 	//item.width();
				// 	jq(item).css("transform","translate3d("+(it_width*x)+"px,"+(it_height*y)+"px,"+"0)");
				// });
				container.masonry({
				  itemSelector: opt.item
				});
			};

			trigger.on('click',function(){
				var tmp = jq(this);
				if(tmp.hasClass('active')) return;
				tmp.addClass('active');
				if(!filContainer.hasClass('active')){
					filContainer.toggleClass('active');
					if ($( window ).width()<450) {
						$('.overlay').css('display','none');
					};
					
					setTimeout(function(){   container.toggleClass('active').masonry();tmp.removeClass('active');},500);								
				}else{
					filContainer.toggleClass('active');
					if ($( window ).width()<450) {
						$('.overlay').css('display','block');
					}
					container.toggleClass('active').masonry();
					tmp.removeClass('active');
				}
			});

			init();
		};
		return self;
	})(jQuery, Echidna || {});


$(window).load(function(){
	/*$('#filter_btn').on('click',function(){
		/*var width=$("#grid_container").width();*/
		/*console.log($(".grid").hasClass("active"));
        if(!$("#grid_container").hasClass("active")){
          /*$(".overlay").fadeIn('fast');*/
          /*$('.overlay').css('display','block');
        }
        else{
         /* $('.overlay').fadeOut('fast');*/
         /* $('.overlay').css('display','none');
        }
        });*/
	Echidna.halfContentSlide({triggerBtn:"#filter_btn",filterContainer:"#filter_container",gridContainer:"#grid_container",item:"#grid_container .item"});
	/*$('#filter_btn').on('click',function(){
		/*var width=$("#grid_container").width();*/
		/*console.log($(".grid").hasClass("active"));
        if(!$("#grid_container").hasClass("active")){
          $(".overlay").fadeIn('fast');
          $('.overlay').css('display','block');
        }
        else{
         /* $('.overlay').fadeOut('fast');*/
         /* $('.overlay').css('display','none');
        }
        });*/
	$('#filter_container').height(window.innerHeight-$('.company_header').height()-$('.main_nav').height());
});