import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200"
    >
      <div
        className={`h-2 bg-gradient-to-r ${gradient}`}
      />

      <div className="flex items-center justify-between p-6">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white`}
        >
          <Icon size={28} />
        </div>

      </div>
    </motion.div>
  );
};

export default StatCard;