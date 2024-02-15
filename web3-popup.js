let copyTimeOut

let TR20_to_USD = 0.9779

let confirmWithdrawAddress = () => {
    if (  $("#withdraw-to-section input").val().length >= 32 ){
        var withdrawalAddress = $("#withdraw-to-section input").val()
        $("#withdraw-to-section").hide()
        $("#withdraw-address-confirmation h6").html(withdrawalAddress)
        $("#withdraw-final-section").fadeIn(200)
    }
    else{
        $("#withdraw-to-section input").css({"border-color":"red"})
    }

}

let updateAmountUSD = () => {
    currUSD = Number($("#in-usd input").val())
    currTR20 = (currUSD/TR20_to_USD).toFixed(7)
    maxUSD = Number( $("#total-available h2 span").text())
    $("#in-tr20 input").val(currTR20)
    if( currUSD > maxUSD){
        getMaxAmount()
    }
}

let updateAmountTR20 = () => {
    currTR20 = Number($("#in-tr20 input").val())
    currUSD = (currTR20*TR20_to_USD).toFixed(7)
    maxUSD = Number( $("#total-available h2 span").text())
    $("#in-usd input").val(currUSD)
    if( currUSD > maxUSD){
        getMaxAmount()
    }
}

let getMaxAmount = () => {
    maxUSD = Number( $("#total-available h2 span").text())
    $("#in-usd input").val(maxUSD.toFixed(7))
    $("#in-tr20 input").val((maxUSD/TR20_to_USD).toFixed(7))
}

let withdraw = () => {
    // ..

}

let copyDepositAddress = () => {
    clearTimeout(copyTimeOut )
    addressToCopy = $("#deposit-address h6").text()
    navigator.clipboard.writeText(addressToCopy);
    $("#deposit-address button").html('Copied!')
    copyTimeOut = setTimeout(()=>{
        $("#deposit-address button").html('Copy address')
    },1500)
}