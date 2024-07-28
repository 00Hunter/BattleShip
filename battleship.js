var  view={
    displaymessage:function(msg){
        var messagearea=document.getElementById("messageArea");
        messagearea.innerHTML=msg;
    },
    displayhit:function(location){
        var cell=document.getElementById(location);
        cell.setAttribute("class","hit")

    },
    displaymiss:function(location){
        var cell=document.getElementById(location);
        cell.setAttribute("class","miss");
    }

}


var model={
    boardsize:7,
    noOfShips:3,
    shipSank:0,
    ShipLength:3,
    ships:[
        {
            locations:['01','02','03'],
            hits:[0,0,0]
        },
        {
            locations:['23','24','25'],
            hits:[0,0,0]
        }, 
        {
            locations:['46','45','44'],
            hits:[0,0,0]
        }
    ],
    fire:function(guess){
        //if it hits or not     
        //first search in location of each ship if there is guess coords or not

        for(var i=0;i<this.noOfShips;i++){
           var ship=this.ships[i];
           var indx=ship.locations.indexOf(guess)
            if(indx>=0){
               ship.hits[indx]=1;  
                view.displaymessage("This is a hit ");
                view.displayhit(guess);
                if(this.isSunk(ship.hits)){
                    this.shipSank++;    
                   view.displaymessage("You sank one ship")
                }
                return true;
                //this is  a hit
            }//else its a miss            
        }
            view.displaymiss(guess);
            view.displaymessage("Oops this is miss try again");
            return false;
    },

    isSunk:function(ship){
        for(var i=0;i<this.ShipLength;i++){
            var hitss=ship[i];
           if(hitss===0){
             return false;
           }
        }
        return true;

    }
}


var controller={
    noGuess:0,

    processGuess:function(input){
        var location=parse(input)
        //validate the location
        if(location===null){
            view.displaymessage("Enter the correct location");
            return;
        }
        this.noGuess++;
        var hit=model.fire(location);
        console.log(model.shipSank)
        if(hit&& model.shipSank===model.noOfShips){
            view.displaymessage("You won in"+this.noGuess+"moves"); 
        }
    }
}

function parse(input) {
    var alphabets=['A','B','C','D','E','F','G'];

    if(input.length!==2){
       return null;
    }

    //length is good 
    //now conversion
    var letter=input.charAt(0);
    var firstdigit=alphabets.indexOf(letter);

    if(firstdigit>6||firstdigit<0){
        return null;
    }

    //validate second digit
    var seconddigit=input.charAt(1);
    if(seconddigit>6||seconddigit<0){
        return null;
    }

    return firstdigit+seconddigit;
    //validate the char

}

function init() {
	// Fire! button onclick handler
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	// handle "return" key press
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	// place the ships on the game board
	model.generateShipLocations();
}

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();

	controller.processGuess(guess);

	guessInput.value = "";
}

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}
window.onload=init;
// controller.processGuess('A3'),
// controller.processGuess('A2')
// controller.processGuess('A1')
// controller.processGuess('C3')
// controller.processGuess('C4')
// controller.processGuess('C5')
// controller.processGuess('E4')
// controller.processGuess('E5')
// controller.processGuess('E6')
// model.fire("73")