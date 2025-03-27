import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { Funko, FunkoData } from "./Funko.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FunkoManager {

  constructor(
    private username: string,
    private userDir?: string,
  ) {
    if (typeof userDir === "undefined") {
      this.userDir = path.join(__dirname, "users", this.username);
    } 
    if (!fs.existsSync(this.userDir)) {
      fs.mkdirSync(this.userDir, { recursive: true });
    }
  }

  /**
   * Añade un funko a la colección 
   * @param funko - Funko
   * @returns - boolean (true === se ha añadido el funko correctamente)
   */
  addFunko(funko: Funko): boolean {
    const filePath = this.getFunkoFilePath(funko.id);
    if (fs.existsSync(filePath)) {
      console.log("\x1b[31mError: El Funko con ID " + funko.id + " ya existe.\x1b[0m");
      return false;
    }
    fs.writeFileSync(filePath, JSON.stringify(funko.toJSON(), null, 2));
    console.log("\x1b[32mFunko " + funko.name + " añadido con éxito.\x1b[0m");
    return true;
  }

  /**
   * Actualiza a un funko en específico si existe
   * @param funko - Funko
   * @returns - boolean - true si se encontró y actualizó el funko
   */
  updateFunko(funko: Funko): boolean {
    const filePath = this.getFunkoFilePath(funko.id);
    if (!fs.existsSync(filePath)) {
      console.log("\x1b[31mError: No se encontró el Funko con ID " + funko.id + ".\x1b[0m");
      return false;
    }
    fs.writeFileSync(filePath, JSON.stringify(funko.toJSON(), null, 2));
    console.log("\x1b[32mFunko " + funko.name + " actualizado con éxito.\x1b[0m");
    return true;
  }

  /**
   * Elimina un funko mediante su id
   * @param id - number
   * @returns - boolean - true si se eliminó correctamente
   */
  deleteFunko(id: number): boolean {
    const filePath = this.getFunkoFilePath(id);
    if (!fs.existsSync(filePath)) {
      console.log("\x1b[31mError: No se encontró el Funko con ID " + id + ".\x1b[0m");
      return false;
    }
    fs.unlinkSync(filePath);
    console.log("\x1b[32mFunko con ID " + id + " eliminado.\x1b[0m");
    return true;
  }

  /**
   * Retorna un array de todos los funkos registrados
   * @returns - Funko[]
   */
  getAllFunkos(): Funko[] {
    if (!fs.existsSync(this.userDir)) {
      return [];
    }
    const files = fs.readdirSync(this.userDir);
    const funkos: Funko[] = [];
    for (const file of files) {
      const filePath = path.join(this.userDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as FunkoData;
      funkos.push(Funko.fromJSON(data));
    }
    return funkos.sort((a, b) => a.id - b.id);
  }

  /**
   * Nos proporciona toda la información de un funko mediante su id
   * @param id - number 
   * @returns Funko | null 
   */
  getFunko(id: number): Funko | null {
    const filePath = this.getFunkoFilePath(id);
    if (!fs.existsSync(filePath)) {
      console.log("\x1b[31mError: No se encontró el Funko con ID " + id + ".\x1b[0m");
      return null;
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as FunkoData;
    return Funko.fromJSON(data);
  }

  private getFunkoFilePath(id: number): string {
    return path.join(this.userDir, `${id}.json`);
  }
}
