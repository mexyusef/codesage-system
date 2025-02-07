import * as vscode from "vscode"

// locale files
import en from "./package.nls.en.json"

export type LocalizeFunction = (key: string, ...args: any[]) => string

export interface Messages {
	[key: string]: string
}

export type MaybePromise<T> = T | Promise<T>

const localeFilesMap = {
	en,
}

let messages: Messages = {}

export const initializeLocalization = async (): Promise<void> => {
	const { language } = vscode.env

	messages = localeFilesMap[language as keyof typeof localeFilesMap] ?? en
}

const format = (message: string, args: any[]): string =>
	message.replace(/{(\d+)}/g, (match, number) => (typeof args[number] !== "undefined" ? args[number] : match))

export const t: LocalizeFunction = (key: string, ...args: any[]) => {
	const message = messages[key] ?? key
	return args.length > 0 ? format(message, args) : message
}

/**
 * @example
 * translateVscodeJsonText("%config.key%") === t('config.key')
 */
export const translateVscodeJsonText = (text: string): string => {
	if (!text.match(/%[^%]+%/)) return text
	return text.replace(/%([^%]+)%/g, (_, key) => t(key))
}
