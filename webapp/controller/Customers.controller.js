sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("electricutilities.controller.Customers", {

		onAfterRendering: function()
		{
			this.getView().getModel().refresh(true);
		},

        onInit: function(){
			
			this.initializeRouter();
			var oModel = new sap.ui.model.json.JSONModel();
        	//oModel.loadData("./model/Articles.json");

			oModel = new sap.ui.model.json.JSONModel("http://localhost:8084/quarkus/customers_pa");

			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			
        	//this.getView().setModel(oModel,"articles");
			//sap.ui.getCore().setModel(oModel,"articles");

			//https://sapui5.hana.ondemand.com/sdk/#/topic/91f0652b6f4d1014b6dd926db0e91070 "Binding"
			//https://sapui5.hana.ondemand.com/sdk/#/topic/2888af49635949eca14fa326d04833b9 "Binding Path Syntax"



			//this.getOwnerComponent().getModel(); //Modelle aus Manifest auslesen
			//this.getView().setModel(oModel, "mymodel");           //zusätzliches Modell setzen
			this.getView().setModel(oModel);  
			//this.getView().getModel();

		},

		initializeRouter: function(){
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        },
        
        onNavBack: function(){
            this.oRouter.navTo("homeRoute");
        },

		onPressCustomer : function(oEvent){
			var sCustomerId = this.getView().getModel().getProperty(oEvent.getParameter("listItem").getBindingContextPath()+"/id");
			this.oRouter.navTo("customerRoute", {customerId: sCustomerId});
		},

		
        handleCreate: function(oEvent)
        {
			//var sCustomerId = this.getView().getModel().getProperty(oEvent.getParameter("listItem").getBindingContextPath()+"/id");
			this.oRouter.navTo("customercreateRoute" );
        },

		
		refresh: function(binding, groupId) 
		{
			if (binding.hasPendingChanges()) {
			  // show message that there are some changes left
			} else {
			  return binding.refresh(groupId);
			}
		  },
        
	});
});