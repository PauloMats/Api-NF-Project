-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDENTE_EMISSAO', 'EMITIDA', 'CANCELADA');

-- CreateTable
CREATE TABLE "NotaFiscal" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dataDesejada" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDENTE_EMISSAO',
    "numeroNF" TEXT,
    "dataEmissao" TIMESTAMP(3),

    CONSTRAINT "NotaFiscal_pkey" PRIMARY KEY ("id")
);
