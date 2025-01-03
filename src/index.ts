import { Command } from 'commander'
import { create_parking_lot, leave_lot, park_vehicle, plate_numbers_by_colors, slot_number_by_plate_number, slot_numbers_by_color, status } from './commands/commands.js'

const program = new Command()

program
    .command('create_parking_lot <num>')
    .description('Create a parking lot with num slot')
    .action((num: string) => create_parking_lot(Number(num)))

program
    .command('park <plate> <color>')
    .description('Allocate a parking spot to car with plate number and color color')
    .action((plate: string, color: string) => park_vehicle(plate.toUpperCase(), color))

program
    .command('leave <num>')
    .description('Deallocate a parking spot')
    .action((num: string) => leave_lot(Number(num)))

program
    .command('status')
    .description('Print the status of parking lot in tabular form')
    .action(status)

program
    .command('registration_numbers_for_cars_with_color <color>')
    .description('Print plate numbers with car color')
    .action((color: string) => plate_numbers_by_colors(color))

program
    .command('slot_numbers_for_cars_with_color <color>')
    .description('Print slot numbers for cars with color')
    .action((color: string) => slot_numbers_by_color(color))

program
    .command('slot_number_for_registration_number <plate>')
    .description('Retrieve slot number for car with number')
    .action((plate: string) => slot_number_by_plate_number(plate))

program.parse()