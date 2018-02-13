library(shiny)
library(ggplot2)
library(bio3d)
library(rsconnect)
library(shinythemes)

ui <- fluidPage(theme = shinytheme("united"),
                
                headerPanel("Pdb statistics"),
                helpText(a("Bio3D is an R package containing utilities for the analysis of protein structure, sequence and trajectory data."
                           , href="http://thegrantlab.org/bio3d/index.php")
                ),
                sidebarPanel(
                  fileInput("file1","Choose pdb file", multiple = T), style="font-size:80%; font-family:Arial; border-color: #2e6da4;background-color: #337ab7")
                ,
                h2("PDB Information"),
                conditionalPanel(
                  'input.dataset === "atom"',
                  helpText("Click the column header to sort a column.")),
                  conditionalPanel(
                    'input.dataset === "seq"',
                    helpText("Display 5 records by default.")),
                conditionalPanel(
                  'input.dataset === "calpha"',
                  helpText("Display 5 records by default.")),
                mainPanel(
                  fluidRow(
                    tabsetPanel(
                      id = 'dataset',
                      tabPanel("atom", DT::dataTableOutput("mytable2")),
                      tabPanel("seq", DT::dataTableOutput("mytable3")),
                      tabPanel("calpha", DT::dataTableOutput("mytable4"))
                    )
                  )
                )
                
)

# le code coté serveur 
server <- function(input, output) {
  
    
    pdbs <- reactive({
      inFile <- input$file1
      if(is.null(inFile)){
        return(NULL)
      }
      
      pdb = read.pdb(inFile$datapath)
      pdba <- as.data.frame(pdb$atom)
      pdbb <- as.data.frame(pdb$seqres)
      pdbc <- as.data.frame(pdb$calpha)
      combo <- list(a = pdba, b = pdbb,c = pdbc)
      return (combo)
      
    })
    myData <- reactive({
      df <- pdbs()
      if(is.null(df)) return(NULL)
      return(df)
    })  
    
  
  # sorted columns are colored now because CSS are attached to them
  output$mytable2 <- DT::renderDataTable({
    DT::datatable(pdbs()$a, options = list(orderClasses = TRUE))
  })
  
  output$mytable3 <- DT::renderDataTable({
    DT::datatable(pdbs()$b, options = list(orderClasses = TRUE))
  })
  output$mytable4<- DT::renderDataTable({
    DT::datatable(pdbs()$c, options = list(orderClasses = TRUE))
  })
  
}

shinyApp(ui = ui, server = server)
