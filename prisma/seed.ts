import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.chatMessage.deleteMany();
  await prisma.chatSession.deleteMany();
  await prisma.job.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  const tenant = await prisma.tenant.create({
    data: {
      name: "Cascade Home Services",
      plan: "Professional",
      brandColor: "#2563eb",
    },
  });

  const passwordHash = await bcrypt.hash("prorab123", 10);

  await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "admin@cascadehs.com",
      name: "Alex Rivera",
      role: "ADMIN",
      passwordHash,
    },
  });

  const tech1 = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "jordan@cascadehs.com",
      name: "Jordan Lee",
      role: "TECHNICIAN",
      passwordHash,
    },
  });

  const tech2 = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "sam@cascadehs.com",
      name: "Sam Okafor",
      role: "TECHNICIAN",
      passwordHash,
    },
  });

  const customers = await Promise.all(
    [
      { name: "Maria Gonzalez", email: "maria.g@example.com", phone: "555-0101", address: "412 Cedar St, Tacoma, WA" },
      { name: "David Kim", email: "david.kim@example.com", phone: "555-0102", address: "88 Alder Ave, Seattle, WA" },
      { name: "Priya Patel", email: "priya.p@example.com", phone: "555-0103", address: "230 Birch Rd, Bellevue, WA" },
      { name: "Tom Nguyen", email: "tom.n@example.com", phone: "555-0104", address: "17 Maple Ct, Renton, WA" },
    ].map((c) => prisma.customer.create({ data: { tenantId: tenant.id, ...c } }))
  );

  const leadDefs = [
    { name: "Maria Gonzalez", email: "maria.g@example.com", phone: "555-0101", serviceType: "HVAC Repair", channel: "WEB_FORM" as const, status: "WON" as const, customerId: customers[0].id },
    { name: "David Kim", email: "david.kim@example.com", phone: "555-0102", serviceType: "Plumbing", channel: "PHONE" as const, status: "QUALIFIED" as const, customerId: customers[1].id },
    { name: "Priya Patel", email: "priya.p@example.com", phone: "555-0103", serviceType: "Electrical Inspection", channel: "CHAT" as const, status: "CONTACTED" as const, customerId: customers[2].id },
    { name: "Tom Nguyen", email: "tom.n@example.com", phone: "555-0104", serviceType: "Landscaping", channel: "YELP" as const, status: "NEW" as const, customerId: customers[3].id },
    { name: "Rachel Ortiz", email: "rachel.o@example.com", phone: "555-0105", serviceType: "Cleaning", channel: "GOOGLE_LSA" as const, status: "NEW" as const },
    { name: "Kevin Brooks", email: "kevin.b@example.com", phone: "555-0106", serviceType: "HVAC Install", channel: "FACEBOOK" as const, status: "LOST" as const },
  ];

  const leads = await Promise.all(
    leadDefs.map((l) => prisma.lead.create({ data: { tenantId: tenant.id, ...l } }))
  );

  const now = new Date();
  const inHours = (h: number) => new Date(now.getTime() + h * 60 * 60 * 1000);

  await Promise.all([
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        leadId: leads[0].id,
        customerId: customers[0].id,
        technicianId: tech1.id,
        title: "AC Unit Repair",
        serviceType: "HVAC Repair",
        status: "IN_PROGRESS",
        scheduledAt: inHours(1),
        amount: 320,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        leadId: leads[1].id,
        customerId: customers[1].id,
        technicianId: tech2.id,
        title: "Kitchen Sink Leak",
        serviceType: "Plumbing",
        status: "SCHEDULED",
        scheduledAt: inHours(4),
        amount: 180,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        customerId: customers[2].id,
        technicianId: tech1.id,
        title: "Panel Inspection",
        serviceType: "Electrical",
        status: "SCHEDULED",
        scheduledAt: inHours(26),
        amount: 150,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        customerId: customers[3].id,
        technicianId: tech2.id,
        title: "Fall Yard Cleanup",
        serviceType: "Landscaping",
        status: "COMPLETED",
        scheduledAt: inHours(-24),
        amount: 260,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        customerId: customers[0].id,
        technicianId: tech1.id,
        title: "Duct Cleaning",
        serviceType: "HVAC Maintenance",
        status: "COMPLETED",
        scheduledAt: inHours(-72),
        amount: 210,
      },
    }),
  ]);

  console.log("Seed complete.");
  console.log("Tenant:", tenant.name);
  console.log("Login: admin@cascadehs.com / prorab123 (Admin)");
  console.log("Login: jordan@cascadehs.com / prorab123 (Technician)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
