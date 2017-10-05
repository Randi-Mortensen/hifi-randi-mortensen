var addClass,
    removeClass,
    validateName,
    validateEmail,
    validateMessage,
    sendForm;

addClass = function (elem, classString) {
    "use strict";
    var oldClassString,
        newClassString;

    oldClassString = elem.className;
    if (oldClassString.search(classString) === -1) {
        newClassString = oldClassString.concat(" " + classString);
        elem.className = newClassString;
    }
};

removeClass = function (elem, classString) {
    "use strict";
    var oldClassString = elem.className,
        newClassString = oldClassString.replace(" " + classString, "") || oldClassString.replace(classString, "");

    elem.className = newClassString;
};

validateName = function (request, response) {
    "use strict";
    var error;
    
    if (request.length === 0) {
        document.getElementsByClassName("userResponse__name")[0]
            .setAttribute("title", "Du skal udfylde dette felt");
        addClass(document.getElementsByClassName("inputName")[0], "formGroup__input--error");
        addClass(document.getElementsByClassName("userResponse__name")[0], "userResponse--show");
        error = true;
    } else if (/\d/.test(request)) {
        document.getElementsByClassName("userResponse__name")[0]
            .setAttribute("title", "Du må ikke bruge tal i dit navn");
        addClass(document.getElementsByClassName("inputName")[0], "formGroup__input--error");
        addClass(document.getElementsByClassName("userResponse__name")[0], "userResponse--show");
        error = true;
    } else {
        removeClass(document.getElementsByClassName("inputName")[0], "formGroup__input--error");
        removeClass(document.getElementsByClassName("userResponse__name")[0], "userResponse--show");
        error = false;
    }
    
    if (error) {
        response(false);
    } else {
        response(true);
    }
    
};

validateEmail = function (request, response) {
    "use strict";
    var error,
        regexpEmail = /^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z])?)$/i;
    
    if (!regexpEmail.test(request)) {
        document.getElementsByClassName("userResponse__email")[0]
            .setAttribute("title", "Du skal skrive en gyldig email adresse");
        addClass(document.getElementsByClassName("inputEmail")[0], "formGroup__input--error");
        addClass(document.getElementsByClassName("userResponse__email")[0], "userResponse--show");
        error = true;
    } else {
        removeClass(document.getElementsByClassName("inputEmail")[0], "formGroup__input--error");
        removeClass(document.getElementsByClassName("userResponse__email")[0], "userResponse--show");
        error = false;
    }
    
    if (error) {
        response(false);
    } else {
        response(true);
    }
};

validateMessage = function (request, response) {
    "use strict";
    var error;
    
    if (request.length <= 40) {
        document.getElementsByClassName("userResponse__textarea")[0]
            .setAttribute("title", "Uddyb venligst din besked!");
        addClass(document.getElementsByClassName("inputMessage")[0], "formGroup__input--error");
        addClass(document.getElementsByClassName("userResponse__textarea")[0], "userResponse--show");
        error = true;
    } else {
        removeClass(document.getElementsByClassName("inputMessage")[0], "formGroup__input--error");
        removeClass(document.getElementsByClassName("userResponse__textarea")[0], "userResponse--show");
        error = false;
    }
    
    if (error) {
        response(false);
    } else {
        response(true);
    }
};

sendForm = function (formObject) {
    "use strict";
    var nameIsValid,
        emailIsValid,
        messageIsValid;
    
    validateName(formObject.name.value, function (response) {
        nameIsValid = response;
    });
    
    validateEmail(formObject.email.value, function (response) {
        emailIsValid = response;
    });
    
    validateMessage(formObject.message.value, function (response) {
        messageIsValid = response;
    });
    
    if (nameIsValid && emailIsValid && messageIsValid) {
        removeClass(document.getElementsByClassName("formResponse")[0], "formResponse--show");
        removeClass(document.getElementsByClassName("formResponse")[0], "formResponse--error");
        removeClass(document.getElementsByClassName("formResponse__iconPlaceholder")[0], "fa fa-times");
        addClass(document.getElementsByClassName("formResponse")[0], "formResponse--show formResponse--success");
        addClass(document.getElementsByClassName("formResponse__iconPlaceholder")[0], "fa fa-check");
        document.getElementsByClassName("formResponse__statusPlaceholder")[0]
            .innerHTML = "Din besked er afsendt. Tak fordi du kontakter os.";
        formObject.reset();
        document.getElementsByClassName("btn")[0].disabled = true;
        removeClass(document.getElementsByClassName("btn")[0], "btn--success");
        addClass(document.getElementsByClassName("btn")[0], "btn--disabled");
        setTimeout(function () {
            removeClass(document.getElementsByClassName("formResponse")[0], "formResponse--show");
            document.getElementsByClassName("btn")[0].disabled = false;
            removeClass(document.getElementsByClassName("btn")[0], "btn--disabled");
            addClass(document.getElementsByClassName("btn")[0], "btn--success");
        }, 7000);
        return false;
    } else {
        removeClass(document.getElementsByClassName("formResponse")[0], "formResponse--show");
        removeClass(document.getElementsByClassName("formResponse")[0], "formResponse--success");
        removeClass(document.getElementsByClassName("formResponse__iconPlaceholder")[0], "fa fa-check");
        addClass(document.getElementsByClassName("formResponse")[0], "formResponse--show formResponse--error");
        addClass(document.getElementsByClassName("formResponse__iconPlaceholder")[0], "fa fa-times");
        document.getElementsByClassName("formResponse__statusPlaceholder")[0]
            .innerHTML = "Ups. Du mangler at udfylde nogle felter.";
        return false;
    }
};

document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    var form = document.getElementById("kontaktFormular");
    
    form.onsubmit = function () {
        return sendForm(this);
    };
    
    form.addEventListener("keyup", function (e) {
        var targetElement = event.target || event.srcElement;
        if (targetElement.name === "name") {
            validateName(targetElement.value, function (response) {});
        } else if (targetElement.name === "email") {
            validateEmail(targetElement.value, function (response) {});
        } else if (targetElement.name === "message") {
            validateMessage(targetElement.value, function (response) {});
        }
    });
});