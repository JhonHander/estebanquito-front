/**
 * Utility function to conditionally join CSS class names
 * Filters out falsy values and joins the remaining classes with spaces
 */
export function cn(...classes: (string | undefined | null | boolean)[]): string {
    return classes.filter(Boolean).join(' ')
}
