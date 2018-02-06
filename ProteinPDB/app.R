library(shiny)
library(ggplot2)
library(bio3d)
library(rsconnect)





ui <- fluidPage(
  headerPanel("Pdb statistics"),
  sidebarPanel(
    fileInput("file1","Choose pdb file")
  ),
  mainPanel(
  fluidRow(column(width = 10,
                  h2("Statistique du PDB"),
    plotOutput(outputId = "plot1")
  )))
)

# le code coté serveur 
server <- function(input, output) {
  pdbs <- reactive({
  inFile <- input$file1
  if(is.null(inFile)){
    return(NULL)
  }
  print(inFile[1])
  print(inFile)
  pdb = read.pdb(inFile$datapath)
  print(pdb)
  modes <- nma(pdb)
  return(modes)
  })
  #objectsLoaded <- load(input$file1$name)
  #df <- eval(parse(text=objectsLoaded[1]))
  #return (df)
  myData <- reactive({
    df <- pdbs()
    if(is.null(df)) return(NULL)
    return(df)
  })  
  output$plot1 <- renderPlot({
    plot(myData())
  })
}

shinyApp(ui = ui, server = server)
