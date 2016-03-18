/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package todo;

import java.net.URI;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.ws.WebServiceContext;
import javax.xml.ws.handler.MessageContext;

/**
 * REST Web Service
 *
 * @author Lucien
 */
@Path("webservice")
public class Webservice {

    @Context
    private UriInfo context;

    public Webservice() {
    }
    
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Response getHello(@HeaderParam("Username") String username, @HeaderParam("Password") String password) {
        
        if (username.equals("root") && password.equals("root")){
            
            return Response.seeOther(URI.create("http://www.google.fr")).build();
            //return "true";
        }else{ // Authentification failed
            return Response.status(404).build();
            //return "false";
        }
        
    }
    
}
