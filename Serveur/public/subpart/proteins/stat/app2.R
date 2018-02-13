library(shiny)
library(ggplot2)
library(bio3d)
library(rsconnect)
library(shinythemes)

ui <- fluidPage(theme = shinytheme("united"),
                
                headerPanel("Pdb statistics"),
                sidebarPanel(
                  fileInput("file1","Choose pdb file", multiple = T), style="font-size:80%; font-family:Arial; border-color: #2e6da4;background-color: #337ab7"
                ),
                conditionalPanel(
                  'input.dataset === "mtcars"',
                  helpText("Click the column header to sort a column.")
                ),
                actionButton("first", "Biological elements found in protein",style="color: #fff; background-color: #337ab7; border-color: #2e6da4"),
                             
                actionButton("second", "Secondary structure in protein",style="color: #fff; background-color: #337ab7; border-color: #2e6da4"), 
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
                                  column(6,plotOutput(outputId = "plot1")),
                                  column(6,plotOutput(outputId = "plot2"))
                    
                  )))
)

# le code coté serveur 
server <- function(input, output) {
  
  observeEvent(input$first, {
    
    pdbs <- reactive({
      inFile <- input$file1
      if(is.null(inFile)){
        return(NULL)
      }
      
      pdb = read.pdb(inFile$datapath)
      atom <- list(name=pdb$atom$elesy)
      ato <- table(atom)
      ato <- as.data.frame(ato)
      return (ato)
    })
    myData <- reactive({
      df <- pdbs()
      if(is.null(df)) return(NULL)
      return(df)
    })  
    output$plot1 <- renderPlot({
      
      ggplot(data=pdbs(), aes(x=atom, y=Freq,colour=atom)) +
        geom_bar(stat="identity", fill="steelblue")+
        geom_text(aes(label=Freq), vjust=-0.3, size=3.5)+
        theme_minimal()
      
    }, height = 800, width = 1024)
    output$selected_var <- renderText({ 
      "Description: Specify the number of atoms for a given protein."
    })
    output$plot2 <- renderPlot({
      NULL
    }, height = 0, width = 0)

    
  })
  
  observeEvent(input$second, {
    
    pdbs <- reactive({
      inFile <- input$file1
      if(is.null(inFile)){
        return(NULL)
      }
      
      pdb = read.pdb(inFile$datapath)
      helix_chain <- list(name=pdb1$helix$chain)
      helix_chain <- table(helix_chain)
      hel <- as.data.frame(helix_chain)
      
      return (hel)
    })
    myData <- reactive({
      df <- pdbs()
      if(is.null(df)) return(NULL)
      return(df)
    })  
    pdbs1 <- reactive({
      inFile <- input$file1
      if(is.null(inFile)){
        return(NULL)
      }
      
      pdb = read.pdb(inFile$datapath)
      sheet_chain <- list(name=pdb1$sheet$chain)
      sheet_chain <- table(sheet_chain)
      she <- as.data.frame(sheet_chain)
      return(she)
    })
    myData1 <- reactive({
      df1 <- pdbs1()
      if(is.null(df1)) return(NULL)
      return(df1)
    })  
    output$plot1 <- renderPlot({
      ggplot(data=pdbs(), aes(x=helix_chain, y=Freq,colour=helix_chain)) +
        geom_bar(stat="identity", fill="steelblue")+
        geom_text(aes(label=Freq), vjust=-0.3, size=3.5)+
        theme_minimal()
    }, height = 400, width = 600)
    
    output$plot2 <- renderPlot({
      ggplot(data=pdbs1(), aes(x=sheet_chain, y=Freq,colour=sheet_chain)) +
        geom_bar(stat="identity", fill="steelblue")+
        geom_text(aes(label=Freq), vjust=-0.3, size=3.5)+
        theme_minimal()
    }, height = 400, width = 600)
    
    output$selected_var <- renderText({ 
      "Description: Determine the number of helix and sheet for a specific chain."
    })
    
  })
  
}

shinyApp(ui = ui, server = server)
