library(shiny)
library(ggplot2)
library(bio3d)



list =c ("1A73.pdb" , "1AG4.pdb",  "1CYQ.pdb" , "1EVW.pdb", "1HDF.pdb"  ,"1IJ6.pdb" , "2BL0.pdb",  "2O6M.pdb"
        , "1A74.pdb",  "1CJA.pdb" , "1CZ0.pdb" , "1EVX.pdb" , "1IJ5.pdb" , "1IPP.pdb" , "2EIX.pdb" , "3A5P.pdb")


ui <- fluidPage(
  headerPanel("Pdb statistics"),
  sidebarPanel(
    selectInput(inputId = "Pdb","Choix du PDB", list)
  ),
  mainPanel(
  fluidRow(column(width = 10,
                  h2("Statistique du PDB"),
    plotOutput(outputId = "plot1")
  )))
)

# le code coté serveur 
server <- function(input, output) {
  selectedData <- reactive({input$Pdb
  })
  
  pdbs <- reactive({ 
    pdb = read.pdb(selectedData())
    print(pdb)
    modes <- nma(pdb)
    return(modes)
  })

  output$plot1 <- renderPlot({
    plot(pdbs())
  })
}


shinyApp(ui = ui, server = server)
