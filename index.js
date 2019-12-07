function validateEmail(value) {
    return true;
}
var EmailEditor = /** @class */ (function () {
    function EmailEditor(rootNode, emails, options) {
        this.options = options;
    }
    EmailEditor.prototype.createEmailNode = function (email) {
        var element = EmailEditor.createEmailElement();
        element.querySelector(".emails-editor__email-content");
        return element;
    };
    EmailEditor.createEmailElement = function () {
        var template = document.createElement("span");
        template.classList.add("emails-editor__email");
        return template.cloneNode();
    };
    return EmailEditor;
}());
