$(function() {

    $("#input-form").submit(function(e) {
        e.preventDefault();
        
        //// do the magic

        let result = $("#result");
        let resultORG = $("<div/>");
        let resultNFC = $("<div/>");
        let resultNFD = $("<div/>");

        result.html("");

        // ORIGINAL
        resultORG.append($("<h2>original</h2>"));
        $("#input").val().split('').forEach(c => {
            let char = $("<div class='char'/>").text(c);
            char.append($("<div class='codepoint'/>").html(
                "\\u" + c.codePointAt(0).toString(16).toUpperCase() + "<br>" +
                "\&" + c.codePointAt(0) + "\;"
            ));
            resultORG.append(char);
        });
        result.append(resultORG);

        // NFC
        resultNFC.append("<h2>normalized (NFC)</h2>");
        $("#input").val().normalize('NFC').split('').forEach(c => {
            let char = $("<div class='char'/>").text(c);
            char.append($("<div class='codepoint'/>").html(
                "\\u" + c.codePointAt(0).toString(16).toUpperCase() + "<br>" +
                "\&" + c.codePointAt(0) + "\;"
            ));
            resultNFC.append(char);
        });
        result.append(resultNFC);

        // NFD
        resultNFD.append("<h2>normalized (NFD)</h2>");
        $("#input").val().normalize('NFD').split('').forEach(c => {
            let char = $("<div class='char'/>").text(c);
            char.append($("<div class='codepoint'/>").html(
                "\\u" + c.codePointAt(0).toString(16).toUpperCase() + "<br>" +
                "\&" + c.codePointAt(0) + "\;"
            ));
            resultNFD.append(char);
        });
        result.append(resultNFD);

    });
    
});