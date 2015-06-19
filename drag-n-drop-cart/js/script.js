$.fn.masonry =  function(){
	return false;
}

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

	Echidna.halfContentSlide({triggerBtn:"#filter_btn",filterContainer:"#filter_container",gridContainer:"#grid_container",item:"#grid_container .item"});

	$('#filter_container').height(window.innerHeight-$('.company_header').height()-$('.main_nav').height());
});



var App = angular.module('drag-and-drop', ['ngDragDrop', 'ngLodash']);

      App.controller('oneCtrl', function($scope, $timeout, lodash, $q) {
        $scope.products = [
            {
              'title': 'Lolcat Shirt',
              'Price' : '150',
              'image' : '',
              'id' : 1,
              'size' : ['s','m'],
              'Quantity': 1
            },
            {
              'title': 'Cheezeburger Shirt',
              'Price' : '110',
              'image' : '',
              'id' : 2,
              'size' : [],
              'Quantity': 1
            },
            {
              'title': 'Buckit Shirt',
              'Price' : '50',
              'image' : '',
              'id' : 3,
              'size' : ['l','xl'],
              'Quantity': 1
            },
            {
              'title': 'Buckit Shirt 2',
              'Price' : '500',
              'image' : '',
              'id' : 4,
              'size' : ['l','xl'],
              'Quantity': 1
            },
            {
              'title': 'Buckit Shirt 3',
              'Price' : '150',
              'image' : '',
              'id' : 5,
              'size' : ['l','xl'],
              'Quantity': 1
            }
          ];
          console.log();
        $scope.cart = [];
        $scope.prodAttOverlay = false;

        $scope.hideMe = function() {
          return $scope.cart.length > 0;
        }
        $scope.onDropFn = function(index){
          var deferred = $q.defer();
          if(lodash.findIndex($scope.cart,'id',$scope.cart[index].id) != -1){
            deferred.reject();
            console.log($scope.cart);
          }
        };
        $scope.beforeDrop = function(index){
          	var deferred = $q.defer();
            var prod = $scope.products[index];
            var index = lodash.findIndex($scope.cart,'id',prod.id);
            console.log(prod.size.length);
          	if($scope.cart.length && index != -1){
              //console.log($scope.cart[index].id);
              $scope.cart[index].Quantity =  $scope.cart[index].Quantity + 1 || 2; 
              deferred.reject();
            	return deferred.promise;
            }
        };

        var fn = function(index,$scope){
          var ind = lodash.findIndex($scope.cart,'id',$scope.products[index].id);
            if(ind != -1){
              $scope.cart[ind].Quantity =  $scope.cart[ind].Quantity + 1 || 1; 
            }else{
              var tmp = angular.copy($scope.products[index]);
              tmp.Quantity = 1;
              $scope.cart.push(tmp);
            }
            $scope.$digest();
        };

        $scope.addToCart = function(index){
            addToCartAnimate(index,fn,index,$scope);            
        };
        $scope.showQuanity = function(){
          var quantity = 0;
          for (var i = $scope.cart.length - 1; i >= 0; i--) {
            quantity = quantity + $scope.cart[i].Quantity || 1;
          };
          return quantity;
        } || 0;
        $scope.onStart = function(index){ console.log(index);};
        $scope.onStop = function(index){ console.log(index);};

        var addToCartAnimate = function(index,fn){
          var cart = $('.drop-down');
          var dim = {
            width : 'auto',
            height : 'auto'
          };
          if(cart.hasClass('active')){
            cart = $('#filter_btn');
            dim.width = '50px';
            dim.height = '50px';
          }
            var imgtodrag = $('.pro1').eq(index);
            var imgdrag1 = imgtodrag.clone();
            imgdrag1.find('.btn').remove();
            var imgclone = imgdrag1.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
                .css({
                'opacity': '0.5',
                    'position': 'absolute',
                    'height': 'auto',
                    'width': imgtodrag.width(),
                    'z-index': '100'
            })
                .appendTo($('body'))
                .animate({
                'top': cart.offset().top + 10,
                'left': cart.offset().left + 10,
                'width' : dim.width,
                'height' : dim.height
            }, 1000, 'easeInOutExpo', function(){
              $(this).detach();
              fn(index,$scope);
            });
        }
    });