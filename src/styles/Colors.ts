import { Severity } from '../model/Severity';


export const Colors = {
  success:  '#28a745',
  warning:  '#fd7e14',
  danger:   '#dc3545',
  unknown:  '#343a40',
};


export function GetSeverityColor(severity: Severity): string {
  switch(severity) {
    case Severity.NORMAL: return Colors.success;
    case Severity.WARNING: return Colors.warning;
    case Severity.URGENT: return Colors.danger;
    default: return Colors.unknown;
  }
}