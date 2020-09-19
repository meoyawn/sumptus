import path from "path";
import util from "util";
import fs from "fs";
import grayMatter from 'gray-matter'

const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

const root = process.cwd()

export const mdNames = (): Promise<string[]> =>
  readdir(path.join(root, "content"))

export type MD = {
  data: Record<string, unknown>
  content: string
}

export const readMD = async (name: string): Promise<MD> =>
  grayMatter(await readFile(path.join(root, "content", name)))
