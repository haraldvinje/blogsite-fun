interface Props {
  show: boolean
}

export const Loader = ({ show }: Props) => {
  return show ? (
    <div className="flex items-center justify-center">
      <div className="mr-3 size-8 animate-spin rounded-full border-4 border-r-blue"></div>
    </div>
  ) : null
}
