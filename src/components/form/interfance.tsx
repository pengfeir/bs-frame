interface Props {
  placeholder?: string
  allowClear?: boolean
  btnname?: string
  btntype?: "primary"
  className?: string
  formtype?: "submit" | "reset"
}
export interface SchemasItem {
  type: string,
  props: Props,
  label?: string,
  name?: string,
  span?: number,
  onChange?(v: string | number): void,
  children?: any,
}
export interface Schemas {
  schemas: SchemasItem[]
}