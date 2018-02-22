$(function(){
//Generate id
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for(var i=0; i<10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}
//Generate id ** END

	function Column(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
		
		//Column elements
		
			var $column = $('<div>').addClass('kanban-column col-m-2 col-s-5 col-sx-11');
			var $columnTitle = $('<h2>').addClass('kanban-column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('kanban-column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('btn-add-card').text('Add a card');
		
		//Column elements ** END
			
		//Delete column
		
			$columnDelete.click(function() {
				self.removeColumn();
			});
		
		//Delete column ** END

		//Add card to column
		
			$columnAddCard.click(function() {
				self.addCard(new Card(prompt("Enter the name of the card")));
			});
		
		//Add card to column ** END

		//Construction Column
		
			$column.append($columnTitle)
					.append($columnDelete)
					.append($columnAddCard)
					.append($columnCardList);
		
		//Construction Column ** END

		//Return created column
			
			return $column;

		//Return created column ** END
				
		}

	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	}

	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createdCard();

		function createdCard() {
			var $card = $('<li>').addClass('kanban-card');
			var $cardDescription = $('<p>').addClass('kanban-card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');	
			
			$cardDelete.click(function() {
				self.removeCard();
			});

		$card.append($cardDelete)
			.append($cardDescription);

		return $card;
		}
	}

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}

	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#kanban-board .kanban-column-container')
	};

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
 	}

 	$('.btn-create-column')
 		.click(function(){
 			var name = prompt('Enter a column name');
 			var column = new Column(name);
 			board.addColumn(column);
 		});

 		board.addColumn(new Column('To Do'));
		board.addColumn(new Column('In Progress'));
		board.addColumn(new Column('Done'));
})