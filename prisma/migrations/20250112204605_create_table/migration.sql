-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PROCESSANDO', 'ENVIADO', 'ENTREGUE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveres" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "DeliveryStatus" NOT NULL DEFAULT 'PROCESSANDO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "deliveres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_log" (
    "id" TEXT NOT NULL,
    "delivery_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "delivery_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "deliveres" ADD CONSTRAINT "deliveres_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_log" ADD CONSTRAINT "delivery_log_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "deliveres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
