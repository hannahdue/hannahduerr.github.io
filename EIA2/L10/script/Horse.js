"use strict";
var MacDonaldsFarm2;
(function (MacDonaldsFarm2) {
    class Horse extends MacDonaldsFarm2.Animal {
        constructor(_name, _food, _foodAmount, _sound) {
            super("Horse", "Hay", 5, "Whieeew");
        }
        doSpecialAction() {
            let horseText = "the horse went for a ride with Old MacDonald, ";
        }
    }
    MacDonaldsFarm2.Horse = Horse;
})(MacDonaldsFarm2 || (MacDonaldsFarm2 = {}));
//# sourceMappingURL=Horse.js.map