function getResultElement(input){
    let element = $("<div/>");
    input.split('').forEach(c => {
        let char = $("<div class='char'/>").text(c);
        char.append($("<div class='codepoint'/>").html(
            "\\u" + c.codePointAt(0).toString(16).toUpperCase() + "<br>" +
            "&amp;#" + c.codePointAt(0) + "\;"
        ));
        element.append(char);
    });
    return element;
}

$(function() {

    $("#input-form").submit(function(e) {
        e.preventDefault();
        
        //// do the magic

        let result = $("#result");
        result.html("");

        // ORIGINAL
        let input = $("#input").val();
        result.append($("<h2>original (" + input.length + ")</h2>"));
        result.append(getResultElement(input));

        // NFC
        let inputNFC = $("#input").val().normalize('NFC');
        result.append("<h2>NFC-normalized (" + inputNFC.length + ")</h2>");
        result.append(getResultElement(inputNFC));

        // NFD
        let inputNFD = $("#input").val().normalize('NFD');
        result.append("<h2>NFD-normalized (" + inputNFD.length + ")</h2>");
        result.append(getResultElement(inputNFD));

    });
    
});