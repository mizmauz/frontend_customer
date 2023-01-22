sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../utils/Formatter",
    "../utils/Utils",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(Controller, Formatter, Utils, MessageToast, MessageBox) {
	"use strict";

// Object Page Layout

	return Controller.extend("electricutilities.controller.Customer", {
   
        formatter: Formatter,
        
        onInit: function(){
			this.initializeRouter();
		},

		initializeRouter: function(){
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter.getRoute("customerRoute").attachPatternMatched(this.onCustomerRouteMatched, this);
        },

        onNavBack: function(){
            this.oRouter.navTo("customersRoute");
        },

        handleDelete: function()
        {

        },

        onCustomerRouteMatched: function(oEvent){
            var sCustomerId = oEvent.getParameter("arguments").customerId;

			var oModel = new sap.ui.model.json.JSONModel();
        	//oModel.loadData("./model/Articles.json");

            var path = "http://localhost:8084/quarkus/customers_pa/" + sCustomerId;
			oModel = new sap.ui.model.json.JSONModel(path);

            //https://www.clouddna.at/features-en/restmodel-for-sap-ui5/
            //https://github.com/axios/axios
            //https://github.com/clouddnagmbh/RestModel

        	//this.getView().setModel(oModel,"articles");
			//sap.ui.getCore().setModel(oModel,"articles");

			//https://sapui5.hana.ondemand.com/sdk/#/topic/91f0652b6f4d1014b6dd926db0e91070 "Binding"
			//https://sapui5.hana.ondemand.com/sdk/#/topic/2888af49635949eca14fa326d04833b9 "Binding Path Syntax"

			//this.getOwnerComponent().getModel(); //Modelle aus Manifest auslesen
			//this.getView().setModel(oModel, "mymodel");           //zusätzliches Modell setzen
			this.getView().setModel(oModel);  

            // oData - data to be updated


            // this.getView().bindElement({
            //    path: "/" + sCustomerId, 
            //    parameters : {
            //        groupId : "customerDetails"
            //    }
            // });
        },

        onEdit: function(){
            this.enableEditMode(true);
        },


        // onPress: function(event) {
        //     var sValue = this.byId("firstName").getValue();
        //     var aData = $.ajax({
        //         url: '/customer',
        //         dataType: 'json',
        //         type: 'post',
        //         async: false,
        //         data: sValue
        //         }),
        //         processData: false,
        //         success: function(data, textStatus, jQxhr) {
        //             var oModel = new JSONModel({
        //                 data: {}
        //             });
        //             oModel.setData(data);
        //         }
        //     });
        //     this.byId("result").setText(aData.responseText);
        // },

        onSave: function() 
        {
            //setProperty(sPath, oValue, oContext?, bAsyncUpdate?) : boolean
            var oModel = this.getView().getModel();

            var databefore = oModel.getData();
            var modelbefore = oModel;

            var uri = "http://localhost:8084/quarkus/customers"; // + sCustomerId;
			//oModel = new sap.ui.model.json.JSONModel(path);

            // var aData = $.ajax({
            // type: "PUT",
            // url: uri,
            // contentType: "application/json",
            // dataType: "json",
            // data: JSON.stringify(oModel.getData()),
            // success: function (data) {
            //     var jsonData = data;
            //     oModel.setData(jsonData);
            // }
            // });


            
            var oHeaders = {
                "Content-Type" : "application/json"
            };

            //https://developers4sap.blog/jsonmodel-staerken-schwaechen-anwendung/

            oModel.attachRequestCompleted(function()
            {
                this.enableEditMode(false);
                MessageToast.show(Utils.getI18NText(this, "msgCustomerSaved"));
                //this.getView().getModel().refresh(true);
                //this.getView().getBinding().refresh(true);
                this.getView().setModel(modelbefore)
            }.bind(this));

            oModel.attachRequestFailed(function()
            {
                this.enableEditMode(false);
                //MessageBox.show(Utils.getI18NText(this, "msgCustomerSavedFailed", [oError.statusCode, oError.statusText]));
                MessageBox.show(Utils.getI18NText(this, "msgCustomerSavedFailed", "Error") );
            }.bind(this));


            oModel.loadData(uri, JSON.stringify( databefore ), true, "PUT", null, false, oHeaders);
            

            //oModel.submitChanges({success: mySuccessHandler, error: myErrorHandler});


            // var fnSuccess = function(oModel){
            //     this.enableEditMode(false);
            //     MessageToast.show(Utils.getI18NText(this, "msgCustomerSaved"));
            // }.bind(this);

            // var fnError = function(oError){
            //     this.enableEditMode(false);
            //     MessageBox.show(Utils.getI18NText(this, "msgCustomerSavedFailed", [oError.statusCode, oError.statusText]));
            // }.bind(this);

            // var oRequest = this.getView().getModel().submitChanges("customerDetails", fnSuccess, fnError);
            // if(!oRequest){
            //     this.enableEditMode(false);
            // }
        },

        checkVariable: function()
        {
            debugger;
            if ( this.getView().getModel("appState").getProperty("/editMode") == true ) return true;
        },

        onCancel: function(){
            this.enableEditMode(false);
            //this.getView().getModel().resetChanges();
        },


        enableEditMode: function(bEditMode){
            this.getView().getModel("appState").setProperty("/editMode", bEditMode);
        }

    });
});