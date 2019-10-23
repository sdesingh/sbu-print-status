import { Severity } from "../model/Severity";

export const Colors: any = {
  light: {
    success: "#28a745",
    warning: "#fd7e14",
    error: "#dc3545",
    info: "#343a40"
  },
  dark: {
    success: "#05c46b",
    warning: "#ffa801",
    error: "#f53b57",
    info: "#485460"
  }
};

export function GetSeverityClass(severity: Severity): string {
  switch (severity) {
    case Severity.NORMAL:
      return "success";
    case Severity.WARNING:
      return "warning";
    case Severity.URGENT:
      return "error";
    default:
      return "info";
  }
}

export function GetSeverityColor(
  severity: Severity,
  darkMode: boolean
): string {
  let colors = darkMode ? Colors.dark : Colors.light;

  switch (severity) {
    case Severity.NORMAL:
      return colors.success;
    case Severity.WARNING:
      return colors.warning;
    case Severity.URGENT:
      return colors.error;
    default:
      return colors.info;
  }
}
