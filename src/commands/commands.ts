import chalk from "chalk";
import { getRegistrationNumbersByColor, getSlotNumbersForCarsByColor, getStatus, initializeFile, leave, park, slotNumberByRegistratoinNumber } from "./file.js"
import Table from 'cli-table3';


export const create_parking_lot = async (num: number) => {
    try {
        await initializeFile(num)
        console.log(chalk.greenBright(`Parking lot created successfully`));
    } catch (error) {
        console.log(error)
    }
}


export const park_vehicle = async (plate: string, color: string) => {
    try {
        let res = await park(plate, color)
        if (res) {
            console.log(chalk.greenBright(`Allocated slot number: ${res}`))
        } else {
            console.log(chalk.redBright('Slots are not available'))
        }
    } catch (error) {
        console.log(error)
    }
}


export const leave_lot = async (num: number) => {
    try {
        const res = await leave(num)
        if (res) {
            console.log(chalk.greenBright(`Slot number ${num} is free  `))
        }
    } catch (error) {
        console.log(error)
    }
}


export const status = async () => {
    try {
        const res = await getStatus();
        if (!res?.slots) {
            console.log(chalk.cyan('Slot is empty'));
            return
        }
        const table = new Table({
            head: ['Slot No.', 'Registration No.', 'Color'],
            colWidths: [10, 20, 15]
        });
        res.slots.forEach(slot => {
            table.push([slot.slotNumber, slot.car?.registrationNumber || 'N/A', slot.car?.color || 'N/A']);
        });
        console.log(table.toString());
    } catch (error) {
        console.log(error)
    }
}

export const plate_numbers_by_colors = async (color: string) => {
    try {
        const registrationNumbers = await getRegistrationNumbersByColor(color)
        if (registrationNumbers?.length == 0) {
            console.log(chalk.redBright('No data found'))
        } else {
            registrationNumbers?.forEach(registerationNumber =>
                console.log(registerationNumber)
            )
        }
    } catch (error) {
        console.log(error)
    }
}

export const slot_numbers_by_color = async (color: string) => {
    try {
        const slots = await getSlotNumbersForCarsByColor(color)
        if (slots?.length == 0) {
            console.log(chalk.redBright('No data found'));
        } else {
            slots?.forEach(slot => {
                console.log(slot);
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const slot_number_by_plate_number = () => {

}