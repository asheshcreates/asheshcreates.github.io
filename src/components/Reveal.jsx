import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export function Reveal({ tag = 'div', delay = 0, className, children, ...props }) {
  const Tag = motion[tag]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function RevealGrid({ className, style, children }) {
  const items = Array.isArray(children) ? children : [children]
  return (
    <div className={className} style={style}>
      {items.map((child, i) => (
        <motion.div
          key={child.key ?? i}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE, delay: (i % 6) * 0.07 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
