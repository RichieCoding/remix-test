type DrawerProps = {
  open: boolean
  openFrom: "right" | "left"
  children: React.ReactNode
}

const Drawer = ({ open, openFrom="right", children }: DrawerProps) => {
  return (
    <div>Drawer</div>
  )
}

export default Drawer