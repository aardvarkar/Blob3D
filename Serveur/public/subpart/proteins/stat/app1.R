library(shiny)
library(ggplot2)
library(bio3d)
library(rsconnect)
library(shinythemes)

ui <- fluidPage(theme = shinytheme("united"),
         
  headerPanel("Pdb statistics"),
  sidebarPanel(
    fileInput("file1","Choose pdb file", multiple = F), style="font-size:80%; font-family:Arial; border-color: #2e6da4;background-color: #337ab7"
  ),
  actionButton("first", "Normal Mode Analysis",style="color: #fff; background-color: #337ab7; border-color: #2e6da4"),
  actionButton("second", "Dynamical Cross-Correlation Matrix",style="color: #fff; background-color: #337ab7; border-color: #2e6da4"), 
  actionButton("third", "Force Field Loader",style="color: #fff; background-color: #337ab7; border-color: #2e6da4"), 
  hr(),
  mainPanel(
  fluidRow(column(width = 12,
                  h2("Statistique du PDB"),
                  wellPanel(
                    helpText(   a("Bio3D is an R package containing utilities for the analysis of protein structure, sequence and trajectory data."
                    , href="http://thegrantlab.org/bio3d/index.php")
                    )
                  ),
                  
    verbatimTextOutput("selected_var"),
    plotOutput(outputId = "plot1")
  )))
)

# le code coté serveur 
server <- function(input, output) {
  
  observeEvent(input$first, {
      
      pdbs <- reactive({
        inFile <- input$file1
        name <- inFile$name
        name <- gsub(".pdb", "", name)
        print(name)
        if(is.null(inFile)){
          return(NULL)
       }
      
       pdb = read.pdb(inFile$datapath)
        modes <- nma(pdb)
      return (modes)
     })
      myData <- reactive({
        df <- pdbs()
        if(is.null(df)) return(NULL)
        return(df)
      })  
      output$plot1 <- renderPlot({
        plot(myData(),spread = TRUE)
      }, height = 600, width = 800)
      output$selected_var <- renderText({ 
        paste("Description: Perform normal mode analysis (NMA) on either a single or an ensemble of protein structures.",
          "Details: Normal mode analysis (NMA) is a computational approach for studying and characterizing protein flexibility. Current functionality entails normal modes calculation on either a single protein structure or an ensemble of aligned protein structures.",sep ="\n")
      })

  })
  
  observeEvent(input$second, {
    
    pdbs <- reactive({
      inFile <- input$file1
      if(is.null(inFile)){
        return(NULL)
      }
      
      pdb = read.pdb(inFile$datapath)
      modes <- nma(pdb)
      cm <- dccm(modes)
      return (cm)
    })
    myData <- reactive({
      df <- pdbs()
      if(is.null(df)) return(NULL)
      return(df)
    })  
    output$plot1 <- renderPlot({
      plot(myData(),contour=F, col.regions=bwr.colors(20), at=seq(-1,1,0.1))
    }, height = 600, width = 800)
    
    output$selected_var <- renderText({ 
      paste("Description: Determine the cross-correlations of atomic displacements."
            ,"Details: dccm is a generic function calling the corresponding function determined by the class of the input argument x.",sep = "\n")


    })
    
    
    
  })
  
  observeEvent(input$third, {
    
    pdbs <- reactive({
      inFile <- input$file1
      if(is.null(inFile)){
        return(NULL)
      }
      
      pdb = read.pdb(inFile$datapath)
      modes <- nma(pdb)
      modes.a <- nma(pdb, ff="calpha")
      modes.b <- nma(pdb, ff="anm")
      modes.c <- nma(pdb, ff="pfanm")
      modes.d <- nma(pdb, ff="reach")
      modes.e <- nma(pdb, ff="sdenm")
      r <- rmsip(modes.a, modes.b)
      return (r)
      
    })
    myData <- reactive({
      df <- pdbs()
      if(is.null(df)) return(NULL)
      return(df)
    })  
    output$plot1 <- renderPlot({
      plot(myData(), xlab="ANM", ylab="C-alpha FF")
      
    }, height = 600, width = 800)
    
    output$selected_var <- renderText({ 
      paste("Description: Determine the cross-correlations of atomic displacements."
            ,"Details: This function provides a collection of elastic network model (ENM) force fields for normal modes analysis (NMA) of protein structures. It returns a function for calculating the residue-residue spring force constants."
            , sep ="\n")
    })
    
  })

}

shinyApp(ui = ui, server = server)
