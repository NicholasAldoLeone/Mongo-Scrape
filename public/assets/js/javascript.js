$(document).ready(function(){
    $(document).on("click", "#save-btn", function(){
        var newFavoriate = {
            title: $("#title-" + $(this).val()).text(),
            summary: $("#summary-" + $(this).val()).text(),
            url: $("#url-" + $(this).val()).text()
        }
        
        console.log(newFavoriate);

        $.ajax({
            url: "/api/add",
            type: "post",
            data: newFavoriate
        }).then(function(res){
            console.log("article added to favoriates");
        })
    })

    $(document).on("click", "#delete-btn", function(){
        var removeFavoriate = {
            _id: $(this).val()

        }

        console.log(removeFavoriate);

        $.ajax({
            url: "/api/delete",
            type: "delete",
            data: removeFavoriate
        }).then(function(res){
            location.reload();
        })
    })
})