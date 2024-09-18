$('document').ready(function () {

    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    }

    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    })

    const product = $('#choice');
    $('.btn-add-to-order').click((e) => {
        product.val($(e.target).parents('.product-item').find('.product-item-title').text())
        $('.order')[0].scrollIntoView({behavior: 'smooth'})
    })

    $('.main-info-button').click((e) => {
        $('#products')[0].scrollIntoView({behavior: 'smooth'})
    })

    $('.footer-rights span').text((new Date()).getFullYear());

    let loader = $('.loader');
   const  form = $('form');
   const input = $('form input');
    const popUp = $('.popUp');
    const phone = $('#phone');
    phone.inputmask( {mask: "+999 (99) 999-99-99" });

    $('#submit').click(function (e) {
        e.preventDefault();
        const name = $('#name');
        let hasError = false;
        input.css('border-color', '#821328FF');

        $('.error-input').hide();
        if (!product.val()) {
            product.next().show();
            hasError = true;
            input.css('border-color', 'red');
        }
        if (!name.val()) {
            name.next().show();
            hasError = true;
            input.css('border-color', 'red');
        }
        if (!phone.val()) {
            phone.next().show();
            hasError = true;
            input.css('border-color', 'red');
        }



        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: " https://testologia.ru/checkout ",
                data: {product: product.val(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        form.hide();
                        popUp.show();
                        $(input).css('border-color', '#821328FF');
                        setTimeout(() => {
                            form.show();
                            popUp.hide();
                            }, 2000);


                    }
                    else {
                        input.css('border-color', 'black');
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                    }

                    $('form')[0].reset();

                });

        }


    })









})












