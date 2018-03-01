(function() {

    const el = function(element) {
        if (element.charAt(0) === "#") { //ID
            return document.querySelector(element); //single elementy
        }
        return document.querySelectorAll(element); //nodelist
    };

    var viewer = el('#viewer'), //screen
        equals = el('#equals'), //equal button
        nums = el('.num'), //list of numbers
        ops = el('.ops'), //list of operators
        theNum = "", //current number
        oldNum = "", //first number
        resultNum, //reulst
        operator;

    // When: Number is clicked. Get the current number selected
    const setNum = function() {
        if (resultNum) { // If a result was displayed, reset number
            theNum = this.getAttribute("data-num");
            resultNum = "";
        } else { //otherwise, add digit to previous number
            theNum += this.getAttribute("data-num");
        }

        viewer.innerHTML = theNum; //assign current nubmer to the display viewer
    };

    // When: Operator is clicked. Pass number to oldNum and save operator
    const moveNum = function() {
        oldNum = theNum
        theNum = "";
        operator = this.getAttribute("data-ops");

        equals.setAttribute("data-result", ""); //Reset result in attr
    };

    // When: Equals is clicked. Calculate result
    const displayNum = function() {

        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

        switch (operator) {
            case "plus":
                resultNum = oldNum + theNum;
                break;

            case "minus":
                resultNum = oldNum - theNum;
                break;

            case "multiply":
                resultNum = oldNum * theNum;
                break;

            case "divide":
                resultNum = oldNum / theNum;
                break;
                //if pressed without an opperator, keep number and continue;
            default:
                resultNum = theNum;
        }

        if (!isFinite(resultNum)) {
            if (isNaN) {
                resultNum = "You broke it!";
            } else {
                resultNum = "Look at what you've done";
                el('#box').classList.add("broken");
            }
        }
        //display result
        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);

        //reset old num and keep result
        oldNum = 0;
        theNum = resultNum;
    };

    const clearAll = function() {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
    };
    // Add click event to numbers
    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }

    // Add click event to operators
    for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
    }

    // Add click event to equal sign
    equals.onclick = displayNum;

    // Add click event to clear button
    el("#clear").onclick = clearAll;


}());