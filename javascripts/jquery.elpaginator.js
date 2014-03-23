;(function($){
	$.fn.elpaginator = function(o){
		// options object
		o = $.extend({
			MAX: 10, 				// maximum number of items shown
			list: 'ul',			// check whether it is an ordered or unordered list. Default is ul
			items: 'li',		// list items // default is li
			paginationHTML: '<div class="pagination"><ul class="page-list"></ul></div>', // html for the pagination
			paginationListItemHTML: '<li><a href="#"></a></li>',
			style: 'items' // other value is pages -> show 1-5 6-10, etc, or 1, 2,
		}, o || {});
		
		// config object
		var c = {
			isOrderedList: o.list === 'ol' ? true : false,
			$paginationHTML: $(o.paginationHTML),
			$pageList: null
		};
		c.$pageList = c.$paginationHTML.find('.page-list');
		
		return this.each(function(){
			var g = new Gallery(this, o, c);
		});
	};
	
	/**
	 * @constructor
	 */
	var Gallery = function(el, options, config){
		var that = this;
		this.o = options;
		this.c = config;
		this.el = el;
		this.$items = $(this.o.list, this.el).find(this.o.items);
		this.itemLength = this.$items.length;
		this.pages = Math.ceil(this.itemLength / this.o.MAX);
		this.remainder = this.itemLength % this.o.MAX;

		// if we have 1 or less page worths, exit the script
		if (this.pages <= 1) return;
		// initialises & creates the pagination
		this.createPagination();

		// can be changed depending where you need the pagination to be inserted!
		$(this.el).append(this.c.$paginationHTML);
		// wai aria support
		$(this.el).attr('aaa:live', 'polite');
		console.log('here!');
		$('.pagination li a', this.el).click(function () {
			var page = $('.page-list li a', that.el).index(this) + 1;
			that.showPage(page);
			return false;
		});
		this.showPage();		
	};
	
	Gallery.prototype = {
		/**
		 * show the page passed in
		 * @private
		 * @param {Number} page the page to be shown
		 */	
		showPage: function (page) {
			var page = page || 1;
			this.hideItems(page);
			this.activePageState(page);
			if (this.c.isOrderedList) {
				this.addStartAttribute(page);			
			}
		},

		/**
		 * add active state to the pagination
		 * @private
		 * @param {Number} page current page
		 */
		activePageState: function (page) {
			var index = page - 1;
			var $pageLinks = $('.pagination li');
			$pageLinks.removeClass('selected');
			$pageLinks.eq(index).addClass('selected');
		},


		/**
		 * adds the right start attribute to the ol
		 * @private
		 * @param {Number} page page number
		 */
		addStartAttribute: function (page) {
			$(this.o.list, this.el).attr('start', this.getFrom(page));
		},

		/**
		 * hides the items that are not selected
		 * @private
		 * @param {Number} page number of the page we are on
		 */
		hideItems: function (page) {
			var firstVisible = this.getFrom(page);
			var lastVisible = this.getTo(page);
			var from; // represents index of 1 hidden
			var to; // represents index of last hidden item

			// show all the items that are hidden & show them
			this.$items.filter(':hidden').show();

			// hide the items that are not to be shown
			if (firstVisible === 1) {
				// if we are on the 1st page
				from = lastVisible;
				to = this.itemLength;
				this.$items.slice(from, to).hide();
			} else if (page === this.pages) {
				// if we are on the last page
				from = 0;
				to = firstVisible - 1;
				this.$items.slice(from, to).hide();
			} else {
				// any pages in between have 2 batches that need to be hidden!
				// hide 1st batch
				from = 0;
				to = firstVisible - 1;
				this.$items.slice(from, to).hide();
				// hide 2nd batch
				from = lastVisible;
				to = this.itemLength;
				this.$items.slice(from, to).hide();
			}
		},

		/**
		 * calculates the number of the first item of the page
		 * @private
		 * @param {Number} page number of the page
		 * @returns number of the first item of the page passed in
		 * @type Number
		 */
		getFrom: function (page) {
			return (page - 1) * this.o.MAX + 1;
		},

		/**
		 * calculates the number of the last item of the page
		 * @private
		 * @param {Number} page number of the page
		 * @returns number of the last item of the page passed in
		 * @type Number
		 */	
		getTo: function (page) {
			var last;
			// if page is not the last page
			if (page !== this.pages) {
				last = page * this.o.MAX;
			} else {
				last = this.itemLength;
			}
			return last;
		},
		
		/**
		 * creates the pagination list - with item or pages labels
		 * @private
		 * @returns Describe what it returns
		 * @type String|Object|Array|Boolean|Number
		 */
		createPagination: function () {
			for (var i = 0; i < this.pages; i++) {
				var $listItem = $(this.o.paginationListItemHTML);
				var pagItemText;
				// create a label that is formatted as items or pages.
				// uses subscript notation to select the correct function from the options
				var label = this.create[this.o.style](i, this);
				$listItem.find('a').text(label);

				this.c.$pageList.append($listItem);
			}
		},
	
		/**
		 * creates the label for the pagination in item or page style,
		 * i.e. 1-25, 26-50, etc OR 1, 2, 3
		 * @private
		 * @param {Number} i current list item
		 * @param {Object} that the context of the object - is needed since we are losing the scope
		 * @returns the label
		 * @type String
		 */
		create: {
			items: function(i, that) {
				var from = that.getFrom(i + 1);
				var to = that.getTo(i + 1);
				return from + '-' + to;
			},
			pages: function(i) {
				return i + 1;
			}
		}
	};
})(jQuery);