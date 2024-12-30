const chalk = require("chalk");
import exp from "constants";
import * as fs from "fs";
import * as  path from "path";

interface ICar {
    registrationNumber: string;
    color: string;
}
interface ISlot {
    slotNumber: number;
    car: ICar | null;
}
interface IParkingLot {
    size: number
    slots: ISlot[] | null;
}


const filePath = path.join(__dirname, "parking_lot.json");

async function initializeFile(size: number) {
    const slots: ISlot[] = Array.from({ length: size }, (_, index) => ({
        slotNumber: index + 1,
        car: null,
    }));
    const parkingLot: IParkingLot = {
        size,
        slots,
    };
    await fs.promises.writeFile(filePath, JSON.stringify(parkingLot, null, 2));
}

export async function getParking_lot(): Promise<IParkingLot> {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

export async function saveFile(parking_lot: IParkingLot) {
    await fs.promises.writeFile(filePath, JSON.stringify(parking_lot, null, 2));

}

export async function park(registrationNumber: string, color: string) {
    try {
        const parking_lot = await getParking_lot();
        const available = parking_lot.slots?.find(slot => slot.car == null);
        if (!available) {
            return null
        }
        available.car = { registrationNumber: registrationNumber.trim(), color: color.trim() }
        await saveFile(parking_lot);
    } catch (error) {
        console.log(error)
    }
}


async function leave(slotNumber: number) {
    try {
        const parking_lot = await getParking_lot();

        if (!parking_lot.slots) {
            return null;
        }
        const targetSlot = parking_lot.slots[slotNumber - 1];
        if (!targetSlot.car) {
            console.log(chalk.yellowBright('No car parked in this slot.'));
            return false;
        }
        targetSlot.car = null;
        for (let i = slotNumber - 1; i < parking_lot.slots.length - 1; i++) {
            parking_lot.slots[i].car = parking_lot.slots[i + 1].car; // Move car from next slot
        }
        parking_lot.slots[parking_lot.slots.length - 1].car = null;

        await fs.promises.writeFile(filePath, JSON.stringify(parking_lot, null, 2));

        console.log(`Car has left from slot ${slotNumber}, and the subsequent cars have shifted.`);
    } catch (error) {
        console.log("Error while processing leave request:", error);
    }
}

async function getStatus(): Promise<IParkingLot | null> {
    try {
        const parking_lot = await getParking_lot();
        if (!parking_lot || !parking_lot.slots) {
            return null
        }
        const slots = parking_lot.slots?.filter(slot => slot.car !== null);
        return {
            size: slots?.length,
            slots
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

async function getRegistrationNumbersByColor(color: string): Promise<string[] | null> {
    try {
        const parking_lot = await getParking_lot();
        if (!parking_lot || !parking_lot.slots) {
            console.log(chalk.redBright('Please create a parking slot'));
            return null;
        }

        const byColors = parking_lot.slots
            .filter(slot => slot.car?.color.toLowerCase() === color.trim().toLowerCase())
            .map(slot => slot.car!.registrationNumber)
        console.log(byColors)
        return byColors;
    } catch (error) {
        console.log(error)
        return null
    }
}

async function getSlotNumbersForCarsByColor(color: string): Promise<number[] | null> {
    try {
        const parking_lot = await getParking_lot();
        if (!parking_lot) {
            console.log(chalk.redBright('Please create a parking slot'));
            return null;
        }
        if (!parking_lot.slots) {
            console.log(chalk.redBright('Slots are empty'));
            return null;
        }
        const slots = parking_lot.slots
            .filter(slot => slot.car?.color.toLowerCase() == color.trim().toLowerCase())
            .map(slot => slot.slotNumber)
        console.log(slots)
        return slots
    } catch (error) {
        console.log(error)
        return null
    }
}

async function slotNumberByRegistratoinNumber(registrationNumber: string): Promise<number | null> {
    try {
        const parking_lot = await getParking_lot();
        if (!parking_lot) {
            console.log(chalk.redBright('Please create a parking slot'));
            return null;
        }
        if (!parking_lot.slots) {
            console.log(chalk.redBright('Slots are empty'));
            return null;
        }
        const slot = parking_lot.slots
            .find(slot => slot.car?.registrationNumber.toLowerCase() === registrationNumber.toLowerCase());
        return slot ? slot.slotNumber : null
    } catch (error) {
        console.log(error)
        return null
    }
}

async function main() {
    try {
        await initializeFile(5);
        await park('KA-01-HH-1234', 'white')
        await park('KA-01-HH-9999', 'white')
        await park('wqwerr', 'red')
        await park('wqwerr', 'red')
        await park('wqwerr', 'red')

        await leave(3)

        await getRegistrationNumbersByColor('white')

        await getSlotNumbersForCarsByColor('White')

        const number = await slotNumberByRegistratoinNumber('KA-01-HH-9999')
        console.log(number)

    } catch (error) {
        console.log(error);
    }
}
main()

