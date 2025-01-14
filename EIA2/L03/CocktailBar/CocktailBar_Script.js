"use strict";
var L03_CocktailBar;
(function (L03_CocktailBar) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Start");
        let form = document.querySelector("div#form");
        let slider = document.querySelector("input#amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }
    function handleChange(_event) {
        // console.log(_event);
        // let drink: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select");
        // console.log(drink.value);
        // let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        // console.log(inputs);
        let order = document.querySelector("div#order");
        order.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            let item = document.querySelector("[value='" + entry[1] + "']");
            console.log(entry);
            let price = Number(item.getAttribute("price"));
            //let total: number = 0;
            if (entry[0] == "Drink") {
                order.innerHTML += "Drink: " + item.value + "  € " + price + "<br>";
            }
            else if (entry[0] == "Amount") {
                order.innerHTML += "Amount: " + item.value + "l  € " + price + "<br>";
            }
            else {
                order.innerHTML += item.name + ": " + item.value + "  € " + price + "<br>";
                //total += price;
                //noch nicht dabei: menge von cocktail multipliziert mit literpreis
            }
            //console.log(total);
            //order.innerHTML += "Total: €" + total;
        }
        let versuch = formData.get("Drink");
        console.log(versuch);
    }
    function displayAmount(_event) {
        let progress = document.querySelector("progress");
        let amount = _event.target.value;
        progress.value = parseFloat(amount);
    }
})(L03_CocktailBar || (L03_CocktailBar = {}));
//# sourceMappingURL=CocktailBar_Script.js.map