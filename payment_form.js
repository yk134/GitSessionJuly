odoo.define('payment_wallee_ecommerce.wallee_payment_form', function (require) {
"use strict";
    
var ajax = require('web.ajax');
var PaymentForm = require('payment.payment_form');
var Core = require('web.core');
var Qweb = Core.qweb;
var Rpc = require("web.rpc");
var _t = Core._t;
var Dialog = require("web.Dialog");
console.log("MY JSSSSSS CALLLLLLLLLLLLL")

ajax.loadXML('/payment_wallee_ecommerce/static/src/xml/wallee_interface.xml', Qweb);


PaymentForm.include({
    // xmlDependencies: ['/payment_wallee_ecommerce/static/src/xml/wallee_interface.xml'],
    _createWalleeToken: function (ev, $checkedRadio) {
        var self = this;
        if (ev.type === 'submit') {
            var button = $(ev.target).find('*[type="submit"]')[0]
        } else {
            var button = ev.target;
        }
        this.disableButton(button);
        var acquirerID = this.getAcquirerIdFromRadio($checkedRadio);
        var acquirerForm = this.$('#o_payment_add_token_acq_' + acquirerID);
        var inputsForm = $('input', acquirerForm);
        if (this.options.partnerId === undefined) {
            console.warn('payment_form: unset partner_id when adding new token; things could go wrong');
        }

        var formData = self.getFormData(inputsForm);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", self)
        // var wallee = this.wallee;
        // var card = this.wallee_card_element;
        // console.log("\n\n\n::::wallee:::card", card)
        // if (card._invalid) {
        //     return;
        // }
        return this._rpc({
            route: '/payment/wallee/create_token',
            params: {'acquirer_id': acquirerID}
        }).then(function(result) {
            console.log("resultresultresultresultresult", result)
            if (result.error) {
                return Promise.reject({"message": {"data": { "arguments": [result.error.message]}}});
            } else {
                // _.extend(formData, {"payment_method": result.setupIntent.payment_method});
                return self._rpc({
                    route: '/payment/wallee/iframe_models',
                    params: {'acquirer_id': acquirerID}
                })
            }
        }).then(function(result) {
            if (addPmEvent) {
                if (formData.return_url) {
                    window.location = formData.return_url;
                } else {
                    window.location.reload();
                }
            } else {
                $checkedRadio.val(result.id);
                self.el.submit();
            }
        }).guardedCatch(function (error) {
            // We don't want to open the Error dialog since
            // we already have a container displaying the error
            if (error.event) {
                error.event.preventDefault();
            }
            // if the rpc fails, pretty obvious
            self.enableButton(button);
            self.displayError(
                _t('Unable to save card'),
                _t("We are not able to add your payment method at the moment. ") +
                    self._parseError(error)
            );
        });
    },

    // updateNewPaymentDisplayStatus: function () {
    //     var $checkedRadio = this.$('input[type="radio"]:checked');

    //     if ($checkedRadio.length !== 1) {
    //         return;
    //     }
    //     var provider = $checkedRadio.data('provider')
    //     if (provider === 'wallee') {
    //         // always re-init stripe (in case of multiple acquirers for stripe, make sure the stripe instance is using the right key)
    //         this._unbindStripeCard();
    //         if (this.isNewPaymentRadio($checkedRadio)) {
    //             this._bindStripeCard($checkedRadio);
    //         }
    //     }
    //     return this._super.apply(this, arguments);
    // },
       
    payEvent: function (ev) {
        ev.preventDefault();
        var self= this;
        if ($.blockUI) {
                var content = $(Qweb.render('wallee_interface.display_interface', {}));
                var content = $(Qweb.render("wallee_interface.display_interface"));
                var checkedRadio = self.$('input[type="radio"]:checked');
                self.walleehandler = null;
                var $footerbtn = null;
                var $footerconfirmbtn = null;
                var $footerclosebtn = null;
                var acquirer_id = self.getAcquirerIdFromRadio(checkedRadio)
                var Iframe_url = false
                var parsed_provider_form = $('form[provider="wallee"]');
                console.log("checkedRadio :: ", checkedRadio)
                var transaction_interface = checkedRadio.data('walleeTrans_interface').split('.')[1]
                if (checkedRadio[0].dataset['provider'] == 'wallee') {
                    return self._rpc({
                                route: '/payment/wallee/create_token',
                                params: {
                                    'acquirer_id': acquirer_id,
                                    'transaction_interface': transaction_interface
                                }
                    }).then(function(result) {
                        if (transaction_interface == 'ONSITE') {
                            self.dialog = new Dialog(self, {
                                title: _t("Powered By Wallee Interface"),
                                subtitle: _t(""),
                                //size: 'large',
                                $content: content,
                                buttons: [{
                                    text: _t("Confirm"),
                                    classes: 'btn-primary btn-confirm',
                                    click: function () {
                                        $footerconfirmbtn = self.dialog.$footer.find('.btn-primary.btn-confirm');
                                        //$footerbtn.attr("disabled", true);
                                        self.disableButton($footerconfirmbtn, true);
                                        $footerclosebtn = self.dialog.$footer.find('.btn-primary.btn-close');
                                        self.disableButton($footerclosebtn);
                                        if(self.walleehandler){
                                            self.walleehandler.validate(function(e){
                                                console.log('validate------', e)
                                            });
                                        }
                                    },
                                    close: false,
                                }, {
                                    text: _t("Close"),
                                    classes: 'btn-primary btn-close',
                                    click: function () {
                                        $footerclosebtn = self.dialog.$footer.find('.btn-primary.btn-close');
                                        //$footerbtn.attr("disabled", true);
                                        self.disableButton($footerclosebtn, true);
                                        $footerconfirmbtn = self.dialog.$footer.find('.btn-primary.btn-confirm');
                                        self.disableButton($footerconfirmbtn);
                                        window.location.href = '/shop/payment';
                                    },
                                    close: false,
                                }],
                                dialogClass: 'wallee-payment-form-modal',
                                fullscreen: true,
                                //technical: false,
                            });
                            self.dialog.opened().then(function () {
                                self.dialog.$modal.find('header').find('button.close').hide();
                                var parsed_provider_form = $('form[provider="wallee"]');
                                console.log("parsed_provider_form", parsed_provider_form)
                                var wallee_javascript_url = parsed_provider_form.find('input[name="wallee_javascript_url"]').val();
                                var wallee_payment_method = parsed_provider_form.find('input[name="wallee_payment_method"]').val();
                                console.log("thios >>>>>>>>>>0",self)
                                console.log("wallee_javascript_url", wallee_javascript_url)
                                // console.log("Iframe_url>>>>>>>0",result[0])
                                $.getScript(result[0] , function(data, textStatus, jqxhr) {
                                            console.log(data); // Data returned
                                            console.log(textStatus); // Success
                                            console.log(jqxhr.status); // 200
                                            console.log("Load was performed.");
                                }).done(function(script, textStatus) {
                                    console.log("textStatus",textStatus );
                                    self.walleehandler = window.IframeCheckoutHandler('18975');
                                    // window.IframeCheckoutHandler.configure('replacePrimaryAction', true);
                                    self.walleehandler.setValidationCallback(function(validationResult){
                                        self.dialog.$('ul.wallee-payment-errors').html('');
                                        if (validationResult.success) {
                                            self.walleehandler.submit();
                                        } else {
                                            self.enableButton($footerconfirmbtn);
                                            self.enableButton($footerclosebtn);
                                            $.each(validationResult.errors, function(index, errorMessage) {
                                                self.dialog.$('ul.wallee-payment-errors').append(
                                                        '&lt;li&gt;' + errorMessage + '&lt;/li&gt;');
                                            });
                                        }
                                    });
                                    self.walleehandler.setInitializeCallback(function(){
                                        console.log("setInitializeCallback");
                                    });
                                    self.walleehandler.setHeightChangeCallback(function(height){
                                        console.log("setHeightChangeCallback", height);
                                    });
                                    var containerId = 'wallee-payment-form';
                                    self.walleehandler.create(containerId);
                                }).fail(function( jqxhr, settings, exception ) {
                                    self.dialog.$('ul.wallee-payment-errors').text( "Triggered ajaxError handler." );
                                });
                            });
                            $.unblockUI();
                            self.dialog.open();
                        } else {
                            console.log("result : ", result)
                            $.unblockUI();
                            window.location.href = result;
                        }
                    });
                }else{
                    return this._super.apply(this, arguments);
                }
            }
        // var content = $(Qweb.render('wallee_interface.display_interface', {}));
        // var content = $(Qweb.render("wallee_interface.display_interface"));
        // var checkedRadio = this.$('input[type="radio"]:checked');
        // self.dialog = new Dialog(self, {
        //     title: _t("Powered By Wallee Interface"),
        //     subtitle: _t(""),
        //     //size: 'large',
        //     $content: content,
        //     buttons: [{
        //         text: _t("Confirm"),
        //         classes: 'btn-primary btn-confirm',
        //         click: function () {  
        //             // $footerconfirmbtn = self.dialog.$footer.find('.btn-primary.btn-confirm');
        //             // //$footerbtn.attr("disabled", true);
        //             // self.disableButton($footerconfirmbtn, true);
        //             // $footerclosebtn = self.dialog.$footer.find('.btn-primary.btn-close');
        //             // self.disableButton($footerclosebtn);
        //             // if(self.walleehandler){
        //             //     self.walleehandler.validate();                                                              
        //             // }
        //         },
        //         close: false,
        //     }, {
        //         text: _t("Close"),
        //         classes: 'btn-primary btn-close',
        //         // click: function () {  
        //         //     $footerclosebtn = self.dialog.$footer.find('.btn-primary.btn-close');
        //         //     //$footerbtn.attr("disabled", true);
        //         //     self.disableButton($footerclosebtn, true);
        //         //     $footerconfirmbtn = self.dialog.$footer.find('.btn-primary.btn-confirm');
        //         //     self.disableButton($footerconfirmbtn);
        //         //     window.location.href = '/shop/payment';
        //         // },
        //         close: false,
        //     }],
        //     dialogClass: 'wallee-payment-form-modal',
        //     fullscreen: true,
        //     //technical: false,
        // }).open()
        // self.dialog.opened()
        // first we check that the user has selected a stripe as s2s payment method
        // var acquirer_id = this.getAcquirerIdFromRadio(checkedRadio)
        // if (checkedRadio.length === 1 && this.getAcquirerIdFromRadio(checkedRadio) && checkedRadio.data('provider') === 'wallee') {
        //     // this._createWalleeToken(ev, checkedRadio)
        //     return this._rpc({
        //         route: '/payment/wallee/create_token',
        //         params: {'acquirer_id': acquirer_id}
        //     }).then(function(result) {
        //         console.log("\n\n\n\n::result", result[0])
        //         // console.log(ll)
        //         $.getScript(result[0], function(data, textStatus, jqxhr) {
        //             console.log( data ); // Data returned
        //             console.log( textStatus ); // Success
        //             console.log( jqxhr.status ); // 200
        //             console.log( "Load was performed." );
        //             // console.log(ll)
        //         }).done(function( script, textStatus ) {
        //             console.log("textStatus",textStatus );                      
        //             self.walleehandler = window.IframeCheckoutHandler('18975');
        //             console.log("self.walleehandler", self.walleehandler );  
        //             // self.walleehandler.setValidationCallback(function(validationResult){                             
        //             //     self.dialog.$('ul.wallee-payment-errors').html('');  
        //             //     if (validationResult.success) {
        //             //         self.walleehandler.submit();
        //             //     } else {
        //             //         self.enableButton($footerconfirmbtn);
        //             //         self.enableButton($footerclosebtn);
        //             //         $.each(validationResult.errors, function(index, errorMessage) {
        //             //             self.dialog.$('ul.wallee-payment-errors').append(
        //             //                     '&lt;li&gt;' + errorMessage + '&lt;/li&gt;');
        //             //         });
        //             //     }
        //             // });
        //             // self.walleehandler.setInitializeCallback(function(){
        //             //     console.log("setInitializeCallback");                           
        //             // });
        //             // self.walleehandler.setHeightChangeCallback(function(height){
        //             //     console.log("setHeightChangeCallback", height);                         
        //             // });
        //             var containerId = 'wallee-payment-form';
        //             self.walleehandler.create(containerId);
        //         }).fail(function( jqxhr, settings, exception ) {
        //             // self.dialog.$('ul.wallee-payment-errors').text( "Triggered ajaxError handler." );
        //         });
        //     console.log("RESSSSSSSSSSSSSSSSs", result)
        //     })

        // } else{
        //     return this._super.apply(this, arguments);
        // }
    },
    
    });
});