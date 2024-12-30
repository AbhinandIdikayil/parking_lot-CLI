# Parking Lot CLI

A command-line interface application for managing a parking lot system. This CLI tool helps you create parking lots, manage car parking, and retrieve information about parked vehicles.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:  
   ```bash
   git clone <repository-url>
   cd parking-lot

2. Run the setup script:  
   ```bash
    # For windows
    bin/setup.bat
    
    bin/parking_lot.bat

3. Available commands:
   ```bash
    create_parking_lot <num>                          
    park <plate> <color>                              
    leave <num>                                       
    status                                            
    registration_numbers_for_cars_with_color <color>  
    slot_numbers_for_cars_with_color <color>         
    slot_number_for_registration_number <plate> 
    exit 
    help [command]                                   