'use server'

import OtpModel from '@/models/otp.model'
import bcryptjs from 'bcryptjs'
import { transporter } from '@/lib/mail'
import otpTemplate from '@/lib/otp-template'
import connectDatabase from '@/lib/mongoose'

export async function sendOtp(email: string) {
  await connectDatabase()

  const otp = Math.floor(Math.random() * (1000000 - 100000) + 100000)

  const hashedOtp = await bcryptjs.hash(otp.toString(), 10)

  await OtpModel.create({ email, otp: hashedOtp, expiredAt: Date.now() + 1000 * 60 * 5 })

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: `Tulaganov | Portfolio OTP for verification ${new Date().toLocaleString()}`,
    html: otpTemplate(otp),
  })
}

export async function verifyOtp(email: string, otp: string) {
  try {
    await connectDatabase()

    const userOtps = await OtpModel.find({ email })
    const lastOpt = userOtps[userOtps.length - 1]

    if (lastOpt.expiredAt.getTime() < new Date().getTime())
      return { status: 400, message: 'Verification code is expired' }

    const correctOtp = await bcryptjs.compare(otp, lastOpt.otp)
    if (!correctOtp) return { status: 401, message: 'Incorrect verification code' }

    await OtpModel.deleteMany({ email })

    return { status: 200, message: 'Authorization verified successfully' }
  } catch {
    return { status: 500, message: 'Something went wrong!' }
  }
}
